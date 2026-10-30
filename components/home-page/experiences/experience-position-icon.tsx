import { ExperiencePositionIcon } from "@/types";
import type { IconProps } from "@phosphor-icons/react";
import {
  BriefcaseIcon,
  CodeIcon,
  CompassToolIcon,
  GraduationCapIcon,
  LightbulbIcon,
} from "@phosphor-icons/react/ssr";

const iconMap: Record<
  ExperiencePositionIcon,
  React.ComponentType<IconProps>
> = {
  code: CodeIcon,
  design: CompassToolIcon,
  education: GraduationCapIcon,
  business: BriefcaseIcon,
  idea: LightbulbIcon,
};

export function ExperienceIcon({
  icon,
  ...props
}: {
  icon: ExperiencePositionIcon | undefined;
} & IconProps) {
  const IconComponent = icon ? iconMap[icon] : BriefcaseIcon;
  return <IconComponent {...props} />;
}
