"use client";

import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { buildFileTree, type FileTreeNode } from "@/features/start/helpers/build-file-tree";

/** Folders down to this depth start open, so the module's own folders are visible at once. */
const OPEN_DEPTH = 3;

function FileTreeItem({ node, depth }: { node: FileTreeNode; depth: number }) {
  if (node.children.length > 0) {
    return (
      <Collapsible defaultOpen={depth < OPEN_DEPTH}>
        <CollapsibleTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start aria-expanded:bg-transparent aria-expanded:hover:bg-muted dark:aria-expanded:bg-transparent dark:aria-expanded:hover:bg-muted/50"
            />
          }
        >
          <ChevronRightIcon className="transition-transform group-data-panel-open/button:rotate-90" />
          <FolderIcon />
          {node.name}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-4 flex flex-col">
            {node.children.map((child) => (
              <FileTreeItem key={child.path} node={child} depth={depth + 1} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <div className="flex h-7 items-center gap-1.5 px-2.5 text-[0.8rem] text-muted-foreground [&_svg]:size-3.5">
      <FileIcon aria-hidden />
      {node.name}
    </div>
  );
}

export function FeatureFileTree({ files }: { files: readonly string[] }) {
  return (
    <div className="max-w-md rounded-lg border p-2 font-mono">
      {buildFileTree(files).map((node) => (
        <FileTreeItem key={node.path} node={node} depth={0} />
      ))}
    </div>
  );
}
