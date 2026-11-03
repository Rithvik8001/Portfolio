import { MarkdownAsync } from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { UTM_PARAMS } from "@/constants/utm-params";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { rehypeAddQueryParams, rehypeTrackLinks } from "@/lib/utils";

export function Markdown(props: React.ComponentProps<typeof MarkdownAsync>) {
  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,
        [
          rehypeExternalLinks,
          { target: "_blank", rel: "nofollow noopener noreferrer" },
        ],
        [rehypeTrackLinks, ANALYTICS_EVENTS.markdownLinkClick],
        [rehypeAddQueryParams, UTM_PARAMS],
      ]}
      {...props}
    />
  );
}
