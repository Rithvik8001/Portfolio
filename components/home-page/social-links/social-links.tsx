import { Panel } from "../../ui/panel";
import { SocialLinkItem } from "./social-link-item";
import { RESUME } from "@/constants/resume";
import { SOCIAL_LINKS } from "@/constants/social-links";

const GRID_LINKS = [
  ...SOCIAL_LINKS.map((link) => ({ ...link, rel: "noopener" as const })),
  {
    icon: RESUME.icon,
    title: RESUME.title,
    description: RESUME.description,
    href: RESUME.href,
    rel: "noopener noreferrer" as const,
  },
];

export function SocialLinks() {
  return (
    <Panel>
      <h2 className="sr-only">Social Links</h2>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {GRID_LINKS.map((link) => (
            <SocialLinkItem key={link.title} {...link} />
          ))}
        </div>
      </div>
    </Panel>
  );
}
