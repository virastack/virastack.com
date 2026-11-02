export type FileTreeNode = {
  name: string;
  path: string;
  children: FileTreeNode[];
};

/** Turns file paths into a tree, with folders above files. */
export function buildFileTree(files: readonly string[]) {
  const root: FileTreeNode[] = [];

  for (const file of files) {
    let level = root;
    file.split("/").forEach((name, index, parts) => {
      const path = parts.slice(0, index + 1).join("/");
      let node = level.find((item) => item.name === name);
      if (!node) {
        node = { name, path, children: [] };
        level.push(node);
      }
      level = node.children;
    });
  }

  const sort = (nodes: FileTreeNode[]): FileTreeNode[] =>
    nodes
      .map((node) => ({ ...node, children: sort(node.children) }))
      .sort(
        (a, b) =>
          Number(b.children.length > 0) - Number(a.children.length > 0) ||
          a.name.localeCompare(b.name),
      );

  return sort(root);
}
