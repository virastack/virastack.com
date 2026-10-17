import type { ReactNode } from "react";

import type {
  BlockContent,
  Content,
  Heading,
  List,
  ListItem,
  PhrasingContent,
  Root,
  RootContent,
  Table,
  TableCell,
  TableRow,
} from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";

import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import {
  AcademyBadge,
  AcademyBadgeLogo,
} from "@/features/academy/components/academy-badge";
import { AcademyCallout } from "@/features/academy/components/academy-callout";
import { AcademyCodeBlock } from "@/features/academy/components/academy-code-block";
import { AcademyDetails } from "@/features/academy/components/academy-details";
import {
  AcademyResourceLinks,
  type AcademyResourceLinkItem,
} from "@/features/academy/components/academy-resource-links";
import { ACADEMY_COMPANY_NAME_TO_KIND } from "@/features/academy/constants/badge.constants";
import {
  parseAcademyResourceKind,
  type AcademyResourceKind,
} from "@/features/academy/constants/resource.constants";
import { remarkAcademyAlerts } from "@/features/academy/lib/remark-academy-alerts";
import { remarkAcademyBadges } from "@/features/academy/lib/remark-academy-badges";
import {
  isWideAcademyTable,
  remarkAcademyTables,
} from "@/features/academy/lib/remark-academy-tables";
import {
  readAcademyDetails,
  remarkAcademyDetails,
  type AcademyDetailsItem,
} from "@/features/academy/lib/remark-academy-details";
import {
  getAcademyCitationId,
  getAcademyHeadingText,
  isAcademyResourceHeading,
  isAcademyResourceList,
  readAcademyCitationId,
  remarkAcademyCitations,
} from "@/features/academy/lib/remark-academy-citations";

type AcademyMarkdownProps = {
  content: string;
};

const INLINE_CODE_CLASS =
  "rounded-md border border-border bg-muted/40 px-1 py-0.5 font-mono text-xs font-normal text-foreground md:text-sm";

function getAlertKind(node: BlockContent): string | null {
  const data = node.data as { hProperties?: { "data-academy-alert"?: string } } | undefined;
  return data?.hProperties?.["data-academy-alert"] ?? null;
}

function getBadgeKind(node: PhrasingContent): string | null {
  const data = node.data as { hProperties?: { "data-academy-badge"?: string } } | undefined;
  return data?.hProperties?.["data-academy-badge"] ?? null;
}

function isBadgeNode(node: PhrasingContent): boolean {
  return node.type === ("academyBadge" as string) || getBadgeKind(node) !== null;
}

function readBadgeKind(node: PhrasingContent): string {
  return (
    getBadgeKind(node) ??
    (node as { kind?: string }).kind ??
    ""
  );
}

function readNodeId(data: { hProperties?: unknown } | undefined): string | undefined {
  const props = data?.hProperties;
  if (!props || typeof props !== "object" || !("id" in props)) {
    return undefined;
  }
  return typeof props.id === "string" ? props.id : undefined;
}

function isWhitespaceText(node: PhrasingContent): boolean {
  return node.type === "text" && node.value.trim().length === 0;
}

function isBreakNode(node: PhrasingContent): boolean {
  if (node.type === "break") {
    return true;
  }
  if (node.type === "html") {
    return /^<br\s*\/?>$/i.test(node.value.trim());
  }
  return false;
}

function flattenPhrasingText(nodes: readonly PhrasingContent[]): string {
  return nodes
    .map((node) => {
      if (node.type === "text") return node.value;
      if (node.type === "strong" || node.type === "emphasis") {
        return flattenPhrasingText(node.children);
      }
      if (isBadgeNode(node)) return "";
      if (isBreakNode(node)) return "\n";
      return "";
    })
    .join("")
    .trim();
}

function splitOnBreak(
  nodes: readonly PhrasingContent[],
): { before: PhrasingContent[]; after: PhrasingContent[] } | null {
  const breakIndex = nodes.findIndex((node) => isBreakNode(node));
  if (breakIndex < 0) {
    return null;
  }
  return {
    before: nodes.slice(0, breakIndex),
    after: nodes.slice(breakIndex + 1),
  };
}

function collectBadgeKinds(nodes: readonly PhrasingContent[]): string[] | null {
  const kinds: string[] = [];
  for (const node of nodes) {
    if (isWhitespaceText(node)) continue;
    if (!isBadgeNode(node)) return null;
    kinds.push(readBadgeKind(node));
  }
  return kinds.length > 0 ? kinds : null;
}

function resolveCompanyLabelOverride(
  kind: string,
  trailing: string,
): string | undefined {
  const mapped = ACADEMY_COMPANY_NAME_TO_KIND[trailing];
  if (mapped === undefined) {
    return undefined;
  }
  if (mapped !== kind) {
    return undefined;
  }
  return trailing;
}

type SingleBadgeCell = {
  kind: string;
  label?: string;
};

function readSingleBadgeCell(
  nodes: readonly PhrasingContent[],
): SingleBadgeCell | null {
  const meaningful = nodes.filter((node) => !isWhitespaceText(node));
  if (meaningful.length === 0) return null;

  const first = meaningful[0];
  if (!first || !isBadgeNode(first)) return null;

  const kind = readBadgeKind(first);
  if (meaningful.length === 1) {
    return { kind };
  }

  if (meaningful.length === 2 && meaningful[1]?.type === "text") {
    const trailing = meaningful[1].value.trim();
    if (trailing.length === 0) return { kind };
    const label = resolveCompanyLabelOverride(kind, trailing);
    if (label !== undefined) {
      return { kind, label };
    }
  }

  return null;
}

function renderCitation(identifier: string, key: string): ReactNode {
  return (
    <sup key={key} className="ms-1">
      <a
        href={`#${getAcademyCitationId(identifier)}`}
        className="font-medium text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        {identifier}
      </a>
    </sup>
  );
}

async function renderPhrasing(
  nodes: readonly PhrasingContent[],
  keyPrefix: string,
): Promise<ReactNode[]> {
  const out: ReactNode[] = [];

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (!node) continue;
    const key = `${keyPrefix}-${i}`;

    const citationId = readAcademyCitationId(node);
    if (citationId) {
      out.push(renderCitation(citationId, key));
      continue;
    }

    switch (node.type) {
      case "text":
        out.push(node.value);
        break;
      case "strong":
        out.push(
          <strong key={key} className="font-semibold text-foreground">
            {await renderPhrasing(node.children, key)}
          </strong>,
        );
        break;
      case "emphasis":
        out.push(
          <em key={key} className="italic">
            {await renderPhrasing(node.children, key)}
          </em>,
        );
        break;
      case "inlineCode":
        out.push(
          <code key={key} className={INLINE_CODE_CLASS}>
            {node.value}
          </code>,
        );
        break;
      case "link": {
        const href = node.url;
        const children = await renderPhrasing(node.children, key);
        const className =
          "font-medium text-foreground underline underline-offset-4 hover:text-primary";
        if (href.startsWith("/")) {
          out.push(
            <Link key={key} href={href} className={className}>
              {children}
            </Link>,
          );
        } else {
          out.push(
            <a
              key={key}
              href={href}
              className={className}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
              {children}
            </a>,
          );
        }
        break;
      }
      case "image":
        out.push(
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={key}
            src={node.url}
            alt={node.alt ?? ""}
            title={node.title ?? undefined}
            loading="lazy"
            decoding="async"
            className="my-2 block h-auto w-full rounded-lg outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />,
        );
        break;
      case "break":
        out.push(<br key={key} />);
        break;
      case "footnoteReference":
        out.push(renderCitation(node.identifier, key));
        break;
      case "html":
        out.push(
          <span key={key} dangerouslySetInnerHTML={{ __html: node.value }} />,
        );
        break;
      default: {
        if (isBadgeNode(node)) {
          out.push(<AcademyBadge key={key} kind={readBadgeKind(node)} />);
          break;
        }
        if ("children" in node && Array.isArray(node.children)) {
          out.push(...(await renderPhrasing(node.children as PhrasingContent[], key)));
        }
        break;
      }
    }
  }

  return out;
}

function renderCompanyDetail(text: string, key: string): ReactNode {
  const kind = ACADEMY_COMPANY_NAME_TO_KIND[text.trim()];
  if (kind) {
    return <AcademyBadge key={key} kind={kind} label={text.trim()} />;
  }
  return text;
}

async function renderTableCellContent(
  nodes: readonly PhrasingContent[],
  key: string,
): Promise<ReactNode> {
  const split = splitOnBreak(nodes);
  if (split) {
    const beforeMeaningful = split.before.filter((node) => !isWhitespaceText(node));
    const logoNode = beforeMeaningful[0];
    const titleNodes =
      logoNode && isBadgeNode(logoNode) ? beforeMeaningful.slice(1) : beforeMeaningful;
    const detailText = flattenPhrasingText(split.after);
    const logoKind =
      logoNode && isBadgeNode(logoNode) ? readBadgeKind(logoNode) : null;

    return (
      <span className="inline-flex items-center gap-2">
        {logoKind ? (
          <AcademyBadgeLogo kind={logoKind} className="size-5" />
        ) : (
          <figure aria-hidden className="size-5 shrink-0 rounded-sm bg-muted" />
        )}
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-sm font-semibold text-foreground">
            {await renderPhrasing(titleNodes, `${key}-title`)}
          </span>
          {detailText.length > 0 ? (
            <span className="text-xs leading-4 text-muted-foreground">
              {renderCompanyDetail(detailText, `${key}-detail`)}
            </span>
          ) : null}
        </span>
      </span>
    );
  }

  const badgeCluster = collectBadgeKinds(nodes);
  if (badgeCluster && badgeCluster.length >= 2) {
    return (
      <span className="flex w-max flex-col items-start gap-1">
        {badgeCluster.map((kind, i) => (
          <AcademyBadge key={`${key}-b-${i}`} kind={kind} />
        ))}
      </span>
    );
  }

  const single = readSingleBadgeCell(nodes);
  if (single) {
    return <AcademyBadge kind={single.kind} label={single.label} />;
  }

  return <>{await renderPhrasing(nodes, key)}</>;
}

function phrasingPlainText(nodes: readonly PhrasingContent[]): string {
  return nodes
    .map((node) => {
      if (node.type === "text") return node.value;
      if (node.type === "inlineCode") return `\`${node.value}\``;
      if (node.type === "strong" || node.type === "emphasis") {
        return phrasingPlainText(node.children);
      }
      if (node.type === "link") {
        return phrasingPlainText(node.children);
      }
      return "";
    })
    .join("");
}

function parseResourceKind(text: string): AcademyResourceKind | undefined {
  return parseAcademyResourceKind(text);
}

/**
 * Builds the free-text note after the link and resource-kind emphasis,
 * preserving inline code as backtick-wrapped text.
 */
function parseResourceNote(
  children: readonly PhrasingContent[],
): string | undefined {
  const noteParts: string[] = [];

  for (const child of children) {
    if (child.type === "link") {
      continue;
    }
    if (child.type === "emphasis") {
      const parsed = parseResourceKind(phrasingPlainText(child.children));
      if (parsed) {
        continue;
      }
      noteParts.push(phrasingPlainText(child.children));
      continue;
    }
    if (child.type === "inlineCode") {
      noteParts.push(`\`${child.value}\``);
      continue;
    }
    if (child.type === "text") {
      noteParts.push(child.value);
      continue;
    }
    if (child.type === "strong") {
      noteParts.push(phrasingPlainText(child.children));
    }
  }

  const note = noteParts.join("").replace(/^[—–\-\s]+/, "").trim();
  return note.length > 0 ? note : undefined;
}

function parseResourceListItem(
  item: ListItem,
  index: number,
  listStart: number,
): AcademyResourceLinkItem | null {
  const paragraph = item.children.find((child) => child.type === "paragraph");
  if (!paragraph || paragraph.type !== "paragraph") {
    return null;
  }

  const link = paragraph.children.find((child) => child.type === "link");
  if (!link || link.type !== "link") {
    return null;
  }

  let kind: AcademyResourceKind | undefined;

  for (const child of paragraph.children) {
    if (child.type !== "emphasis") {
      continue;
    }
    const parsed = parseResourceKind(phrasingPlainText(child.children));
    if (parsed) {
      kind = parsed;
    }
  }

  return {
    href: link.url,
    label: phrasingPlainText(link.children).trim(),
    kind,
    note: parseResourceNote(paragraph.children),
    citationId: readNodeId(item.data) ?? getAcademyCitationId(String(listStart + index)),
  };
}

function parseResourceListItems(list: List): AcademyResourceLinkItem[] {
  const start = list.start ?? 1;
  return list.children
    .map((item, index) => parseResourceListItem(item, index, start))
    .filter((item): item is AcademyResourceLinkItem => item !== null);
}

function findFollowingResourceList(
  nodes: readonly (RootContent | Content | BlockContent)[],
  fromIndex: number,
): { list: List; index: number } | null {
  for (let cursor = fromIndex + 1; cursor < nodes.length; cursor += 1) {
    const sibling = nodes[cursor];
    if (!sibling) continue;
    if (sibling.type === "heading") {
      break;
    }
    if (sibling.type === "list" && isAcademyResourceList(sibling)) {
      return { list: sibling, index: cursor };
    }
  }
  return null;
}

async function renderListItem(item: ListItem, key: string): Promise<ReactNode> {
  const children: ReactNode[] = [];
  for (let i = 0; i < item.children.length; i += 1) {
    const child = item.children[i];
    if (!child) continue;
    children.push(...(await renderBlock([child], `${key}-${i}`)));
  }
  const id = readNodeId(item.data);

  return (
    <li
      key={key}
      id={id}
      tabIndex={id ? -1 : undefined}
      className={cn("text-pretty", id && "scroll-mt-20 focus:outline-none")}
    >
      {children}
    </li>
  );
}

async function renderResourceLinks(
  title: string,
  list: List,
  key: string,
): Promise<ReactNode> {
  return (
    <AcademyResourceLinks
      key={key}
      title={title}
      items={parseResourceListItems(list)}
      numbered={list.ordered === true}
    />
  );
}

async function renderList(list: List, key: string): Promise<ReactNode> {
  const Tag = list.ordered ? "ol" : "ul";
  const items = await Promise.all(
    list.children.map((item, i) => renderListItem(item, `${key}-${i}`)),
  );
  return (
    <Tag
      key={key}
      className={
        list.ordered
          ? "list-decimal space-y-2 pl-5"
          : "list-disc space-y-2 pl-5"
      }
    >
      {items}
    </Tag>
  );
}

function cellAlign(align: Table["align"], index: number): string {
  const value = align?.[index];
  if (value === "right") return "text-right tabular-nums";
  if (value === "center") return "text-center";
  return "text-left";
}

async function renderTableCell(
  cell: TableCell,
  key: string,
  tag: "th" | "td",
  alignClass: string,
  options: { isFirstColumn: boolean; isLastRow: boolean },
): Promise<ReactNode> {
  const Tag = tag;
  return (
    <Tag
      key={key}
      className={cn(
        "px-3 py-2 align-middle",
        alignClass,
        tag === "th" &&
          "text-xs font-medium whitespace-normal text-foreground md:text-sm",
        tag === "td" &&
          cn(
            "text-xs leading-relaxed whitespace-pre-line md:text-sm",
            options.isFirstColumn ? "text-foreground" : "text-muted-foreground",
            !options.isLastRow && "border-b border-border",
          ),
      )}
    >
      {tag === "th"
        ? await renderPhrasing(cell.children, key)
        : await renderTableCellContent(cell.children, key)}
    </Tag>
  );
}

async function renderTableRow(
  row: TableRow,
  key: string,
  tag: "th" | "td",
  align: Table["align"],
  options: { isLastRow: boolean },
): Promise<ReactNode> {
  const cells = await Promise.all(
    row.children.map((cell, i) =>
      renderTableCell(cell, `${key}-${i}`, tag, cellAlign(align, i), {
        isFirstColumn: i === 0,
        isLastRow: options.isLastRow,
      }),
    ),
  );
  return (
    <tr
      key={key}
      className={cn(tag === "th" && "border-b border-border bg-muted/30")}
    >
      {cells}
    </tr>
  );
}

async function renderTable(table: Table, key: string): Promise<ReactNode> {
  const [header, ...body] = table.children;
  return (
    <div
      key={key}
      className={cn(
        "my-4 overflow-hidden rounded-xl border border-border",
        isWideAcademyTable(table) && "academy-table-wide",
      )}
    >
      <div className="w-full min-w-0 overflow-x-auto">
        <table className="w-full caption-bottom border-collapse text-sm tabular-nums">
          {header ? (
            <thead>
              {await renderTableRow(header, `${key}-h`, "th", table.align, {
                isLastRow: false,
              })}
            </thead>
          ) : null}
          <tbody>
            {await Promise.all(
              body.map((row, i) =>
                renderTableRow(row, `${key}-b-${i}`, "td", table.align, {
                  isLastRow: i === body.length - 1,
                }),
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function createAcademyProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkAcademyAlerts)
    .use(remarkAcademyBadges)
    .use(remarkAcademyCitations)
    .use(remarkAcademyDetails)
    .use(remarkAcademyTables);
}

async function parseAcademyMarkdown(content: string): Promise<Root> {
  const processor = createAcademyProcessor();
  const tree = processor.parse(content) as Root;
  return (await processor.run(tree)) as Root;
}

async function renderInlineMarkdown(content: string, key: string): Promise<ReactNode> {
  const transformed = await parseAcademyMarkdown(content);
  const [first, ...rest] = transformed.children;
  if (rest.length === 0 && first?.type === "paragraph") {
    return <>{await renderPhrasing(first.children, key)}</>;
  }
  return <>{await renderBlock(transformed.children, key)}</>;
}

async function renderAcademyDetails(
  details: readonly AcademyDetailsItem[],
  key: string,
): Promise<ReactNode> {
  const items = await Promise.all(
    details.map(async (item, index) => {
      const summary = await renderInlineMarkdown(item.summary, `${key}-s-${index}`);
      let body: ReactNode = null;

      if (typeof item.body === "string") {
        if (item.body.length > 0) {
          const bodyTree = await parseAcademyMarkdown(item.body);
          body = await renderBlock(bodyTree.children, `${key}-b-${index}`);
        }
      } else if (item.body.length > 0) {
        body = await renderBlock(item.body, `${key}-b-${index}`);
      }

      return {
        id: `${index}:${item.summary}`,
        summary,
        body,
      };
    }),
  );

  return <AcademyDetails key={key} items={items} />;
}

async function renderBlock(
  nodes: readonly (RootContent | Content | BlockContent)[],
  keyPrefix: string,
): Promise<ReactNode[]> {
  const out: ReactNode[] = [];
  const skippedIndexes = new Set<number>();

  for (let i = 0; i < nodes.length; i += 1) {
    if (skippedIndexes.has(i)) continue;
    const node = nodes[i];
    if (!node) continue;
    const key = `${keyPrefix}-${i}`;

    const details = readAcademyDetails(node);
    if (details) {
      out.push(await renderAcademyDetails(details, key));
      continue;
    }

    switch (node.type) {
      case "paragraph":
        out.push(
          <p key={key} className="text-pretty leading-relaxed text-muted-foreground">
            {await renderPhrasing(node.children, key)}
          </p>,
        );
        break;
      case "heading": {
        if (isAcademyResourceHeading(node as Heading)) {
          const following = findFollowingResourceList(nodes, i);
          if (following) {
            skippedIndexes.add(following.index);
            out.push(
              await renderResourceLinks(
                getAcademyHeadingText(node as Heading),
                following.list,
                key,
              ),
            );
            break;
          }
        }
        const Tag = `h${node.depth}` as "h2" | "h3" | "h4";
        const size =
          node.depth === 2
            ? "pt-4 text-xl font-semibold tracking-tight text-foreground"
            : "text-lg font-semibold tracking-tight text-foreground";
        out.push(
          <Tag key={key} className={`scroll-mt-32 ${size}`}>
            {await renderPhrasing(node.children, key)}
          </Tag>,
        );
        break;
      }
      case "list":
        if (isAcademyResourceList(node)) {
          const t = await getTranslations("Academy");
          out.push(
            await renderResourceLinks(t("furtherResources"), node, key),
          );
          break;
        }
        out.push(await renderList(node, key));
        break;
      case "table":
        out.push(await renderTable(node, key));
        break;
      case "code":
        out.push(
          <AcademyCodeBlock key={key} language={node.lang ?? "text"} code={node.value} />,
        );
        break;
      case "blockquote": {
        const alertKind = getAlertKind(node);
        if (alertKind) {
          out.push(
            <AcademyCallout key={key} kind={alertKind}>
              {await renderBlock(node.children, key)}
            </AcademyCallout>,
          );
        } else {
          out.push(
            <blockquote
              key={key}
              className="border-l-2 border-border pl-4 text-muted-foreground"
            >
              {await renderBlock(node.children, key)}
            </blockquote>,
          );
        }
        break;
      }
      case "thematicBreak":
        out.push(<hr key={key} className="border-border" />);
        break;
      case "html":
        out.push(
          <div key={key} dangerouslySetInnerHTML={{ __html: node.value }} />,
        );
        break;
      case "footnoteDefinition":
        out.push(
          <aside
            key={key}
            id={getAcademyCitationId(node.identifier)}
            className="text-sm text-muted-foreground"
          >
            <span className="mr-2 font-medium text-foreground">[{node.identifier}]</span>
            {await renderBlock(node.children, key)}
          </aside>,
        );
        break;
      default:
        break;
    }
  }

  return out;
}

export async function AcademyMarkdown({ content }: AcademyMarkdownProps) {
  const transformed = await parseAcademyMarkdown(content);
  const children = await renderBlock(transformed.children, "root");

  return <div className="min-w-0 space-y-6 text-base leading-relaxed">{children}</div>;
}
