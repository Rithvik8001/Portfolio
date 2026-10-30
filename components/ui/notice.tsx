import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  WarningIcon,
} from "@phosphor-icons/react/ssr";

import { cn } from "@/lib/utils";

const TONES = {
  neutral: { text: "text-ink", Icon: InfoIcon },
  ok: { text: "text-ok", Icon: CheckCircleIcon },
  bad: { text: "text-bad", Icon: WarningCircleIcon },
  warn: { text: "text-warn", Icon: WarningIcon },
} as const;

type NoticeProps = React.ComponentProps<"div"> & {
  tone?: keyof typeof TONES;
  icon?: React.ReactNode | false;
  action?: React.ReactNode;
};

function Notice({
  className,
  tone = "neutral",
  icon,
  action,
  children,
  ...props
}: NoticeProps) {
  const { text, Icon } = TONES[tone];
  const showIcon = icon !== false;

  return (
    <div
      data-slot="notice"
      role={tone === "bad" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-notice bg-fill px-4 py-4 text-body",
        text,
        className,
      )}
      {...props}
    >
      {showIcon && (
        <span className="mt-[3px] shrink-0 [&_svg]:size-4">
          {icon ?? <Icon />}
        </span>
      )}
      <div className="min-w-0 flex-1 text-ink">{children}</div>
      {action && <div className="shrink-0 self-center">{action}</div>}
    </div>
  );
}

export { Notice };
