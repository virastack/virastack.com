"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

import { ChevronRightIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { CopyButton } from "@/components/copy-button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileTypeIcon } from "@/features/start/components/FileTypeIcon";
import { buildFileTree, type FileTreeNode } from "@/features/start/helpers/build-file-tree";
import { useFeatureFiles } from "@/features/start/hooks/use-feature-files";
import { useTsxTokens } from "@/features/start/hooks/use-tsx-tokens";
import type { RegistryFile } from "@/features/start/schemas/registry-item.schema";
import type { InstallVariant } from "@/features/start/stores/feature-install.store";
import { useFeatureInstallStore } from "@/features/start/stores/feature-install.store";

const TEMPLATES = [
  { value: "nextjs", label: "Next.js" },
  { value: "nextjs-i18n", label: "Next.js · i18n" },
  { value: "tanstack", label: "TanStack Start" },
  { value: "tanstack-i18n", label: "TanStack Start · i18n" },
] as const satisfies readonly { value: InstallVariant; label: string }[];

/** A card with a title row and a bordered inner box, as in the shadcn/ui block viewer. */
const cardClassName =
  "flex min-h-0 min-w-0 flex-col rounded-xl bg-muted/50 p-1 pt-0 ring-1 ring-border/60 ring-inset";
const cardHeaderClassName = "flex h-10 shrink-0 items-center gap-3 px-3 text-sm";
const cardBodyClassName =
  "min-h-0 flex-1 overflow-hidden rounded-[9px] border border-border bg-background";
const hiddenScrollbarClassName = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const rowClassName = cn(
  "flex h-8 w-full items-center gap-2 pr-2 pl-(--indent) text-left text-xs whitespace-nowrap text-foreground outline-none",
  "hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset dark:hover:bg-muted/50",
  "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
);

/** Folds a chain of single folders into one row (`src/features/users`), so file names keep their room. */
function compactTree(nodes: FileTreeNode[]): FileTreeNode[] {
  return nodes.map((node) => {
    let current = node;
    let name = node.name;
    let onlyChild = current.children.length === 1 ? current.children[0] : undefined;

    while (onlyChild && onlyChild.children.length > 0) {
      current = onlyChild;
      name = `${name}/${current.name}`;
      onlyChild = current.children.length === 1 ? current.children[0] : undefined;
    }

    return { ...current, name, children: compactTree(current.children) };
  });
}

/** Files in tree order, so the first pick matches what the tree shows first. */
function flattenTree(nodes: FileTreeNode[]): string[] {
  return nodes.flatMap((node) =>
    node.children.length > 0 ? flattenTree(node.children) : node.path,
  );
}

/** Opens on the first component rather than a test or an API helper. */
function pickDefaultFile(paths: string[]) {
  return paths.find((path) => path.endsWith(".tsx") && !path.includes(".test.")) ?? paths[0];
}

function TreeItem({
  node,
  depth,
  activePath,
  onSelect,
}: {
  node: FileTreeNode;
  depth: number;
  activePath: string | undefined;
  onSelect: (path: string) => void;
}) {
  const indent = { "--indent": `${0.5 + depth * 1.25}rem` } as CSSProperties;

  if (node.children.length > 0) {
    return (
      <Collapsible defaultOpen className="flex flex-col gap-px">
        <CollapsibleTrigger
          style={indent}
          className={cn(
            rowClassName,
            "data-panel-open:[&>svg:first-child]:rotate-90",
            "[&:not([data-panel-open])>[data-slot=folder-open]]:hidden data-panel-open:[&>[data-slot=folder]]:hidden",
          )}
        >
          <ChevronRightIcon className="transition-transform" aria-hidden />
          <FolderIcon data-slot="folder" aria-hidden />
          <FolderOpenIcon data-slot="folder-open" aria-hidden />
          {node.name}
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-px">
          {node.children.map((child) => (
            <TreeItem
              key={child.path}
              node={child}
              depth={depth + 1}
              activePath={activePath}
              onSelect={onSelect}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  const isActive = node.path === activePath;

  return (
    <button
      type="button"
      style={indent}
      aria-current={isActive ? "true" : undefined}
      onClick={() => onSelect(node.path)}
      className={cn(rowClassName, isActive && "bg-muted dark:bg-muted/50")}
    >
      {/* Keeps file names in line with folder names. */}
      <ChevronRightIcon className="invisible" aria-hidden />
      <FileTypeIcon name={node.name} />
      <span className="truncate">{node.name}</span>
    </button>
  );
}

function CodeLines({ code }: { code: string }) {
  const tokens = useTsxTokens(code);
  const plainLines = useMemo(() => code.split("\n"), [code]);
  const lines = tokens ?? plainLines;

  return (
    <pre
      className={cn(
        "h-full overflow-auto overscroll-contain py-4 font-mono text-xs leading-5 text-foreground",
        hiddenScrollbarClassName,
      )}
    >
      <code className="grid min-w-max">
        {lines.map((line, index) => (
          <span key={index} className="flex pr-4">
            <span
              aria-hidden
              className="w-16 shrink-0 pe-6 text-right text-muted-foreground/60 tabular-nums select-none"
            >
              {index + 1}
            </span>
            <span className="whitespace-pre [&>span]:text-(color:--shiki-light) dark:[&>span]:text-(color:--shiki-dark)">
              {typeof line === "string"
                ? line
                : line.map((token, tokenIndex) => (
                    <span key={tokenIndex} style={token.htmlStyle as CSSProperties}>
                      {token.content}
                    </span>
                  ))}
              {/* An empty line still needs its height. */}
              {line.length === 0 ? " " : null}
            </span>
          </span>
        ))}
      </code>
    </pre>
  );
}

function CodePanel({ file }: { file: RegistryFile }) {
  const t = useTranslations("StartFeatureCatalog.detail");

  return (
    <figure className={cn(cardClassName, "relative m-0 flex-1")}>
      <figcaption
        className={cn(
          cardHeaderClassName,
          "pr-10 font-mono text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0",
        )}
      >
        <FileTypeIcon name={file.target} />
        <span className="truncate">{file.target}</span>
      </figcaption>
      <CopyButton
        text={file.content}
        variant="ghost"
        size="icon-sm"
        className="absolute top-1.5 right-1.5 size-7 text-muted-foreground"
        aria-label={t("codeCopy")}
      />
      <div className={cardBodyClassName}>
        <CodeLines code={file.content} />
      </div>
    </figure>
  );
}

function TemplateSelect({ variant }: { variant: InstallVariant }) {
  const t = useTranslations("StartFeatureCatalog.detail");
  const { setFramework, setI18n } = useFeatureInstallStore();

  return (
    <Select
      items={TEMPLATES}
      value={variant}
      onValueChange={(value) => {
        if (!value) return;
        setFramework(value.startsWith("tanstack") ? "tanstack" : "nextjs");
        setI18n(value.endsWith("-i18n"));
      }}
    >
      <SelectTrigger size="sm" aria-label={t("codeTemplate")} className="h-7 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {TEMPLATES.map((template) => (
          <SelectItem key={template.value} value={template.value}>
            {template.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** The module's real files for the picked template, as a tree beside the code. */
export function FeatureCodeViewer({ feature }: { feature: string }) {
  const t = useTranslations("StartFeatureCatalog.detail");
  const { framework, i18n } = useFeatureInstallStore();
  const variant: InstallVariant = i18n ? `${framework}-i18n` : framework;
  const { files, isError, isLoading } = useFeatureFiles(feature, variant);
  const [pickedPath, setPickedPath] = useState<string | null>(null);

  // `skipHydration` keeps the first render equal to the server HTML; the saved pick loads after mount.
  useEffect(() => {
    void useFeatureInstallStore.persist.rehydrate();
  }, []);

  const tree = useMemo(
    () => (files ? compactTree(buildFileTree(files.map((file) => file.target))) : []),
    [files],
  );
  const paths = useMemo(() => flattenTree(tree), [tree]);
  // A template change can drop the picked file, so it falls back to the default.
  const activePath = pickedPath && paths.includes(pickedPath) ? pickedPath : pickDefaultFile(paths);
  const activeFile = files?.find((file) => file.target === activePath);

  const isReady = !isLoading && !isError && activeFile;

  return (
    <div className="flex h-[40rem] flex-col gap-2 lg:flex-row">
      <nav
        aria-label={t("codeFiles")}
        className={cn(cardClassName, "max-h-56 lg:max-h-none lg:w-72")}
      >
        {/* The template picker stays put while a template's files load. */}
        <div className={cn(cardHeaderClassName, "justify-between pr-1.5 pl-4")}>
          <span className="font-medium text-foreground/70">{t("codeFiles")}</span>
          <TemplateSelect variant={variant} />
        </div>
        <div className={cn(cardBodyClassName, "overflow-y-auto py-2", hiddenScrollbarClassName)}>
          {isReady ? (
            <div className="flex flex-col gap-px">
              {tree.map((node) => (
                <TreeItem
                  key={node.path}
                  node={node}
                  depth={0}
                  activePath={activePath}
                  onSelect={setPickedPath}
                />
              ))}
            </div>
          ) : null}
        </div>
      </nav>
      {isReady ? (
        <CodePanel file={activeFile} />
      ) : (
        <div className={cn(cardClassName, "flex-1 pt-1")}>
          <div className={cn(cardBodyClassName, "flex")}>
            <p
              role={isError ? "alert" : "status"}
              className="m-auto px-6 text-center text-sm text-muted-foreground"
            >
              {isError ? t("codeError") : t("codeLoading")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
