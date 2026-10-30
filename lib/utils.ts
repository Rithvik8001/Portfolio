import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { visit } from "unist-util-visit";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copyText = async (text: string) => {
  await navigator.clipboard.writeText(text);
};

export function urlToName(url: string) {
  return url.replace(/(^\w+:|^)\/\//, "");
}

export function addQueryParams(
  urlString: string,
  query: Record<string, string>,
): string {
  try {
    const url = new URL(urlString);

    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value);
    }

    return url.toString();
  } catch {
    return urlString;
  }
}

export function rehypeAddQueryParams(params: Record<string, string>) {
  return (tree: any) => {
    visit(tree, (node: any) => {
      if (
        node.type !== "element" ||
        node?.tagName !== "a" ||
        !node?.properties?.href
      ) {
        return;
      }

      const href = node.properties?.href as string | undefined;

      if (
        !href ||
        href.startsWith("/") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      ) {
        return;
      }

      node.properties.href = addQueryParams(href, params);
    });
  };
}
