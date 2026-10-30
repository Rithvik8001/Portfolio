"use client";

import { TZDate, tzOffset } from "@date-fns/tz";
import { format } from "date-fns";
import { ClockIcon } from "@phosphor-icons/react/ssr";
import { useEffect, useState } from "react";

import { IntroItem, IntroItemContent, IntroItemIcon } from "./intro-item";

type CurrentLocalTimeItemProps = {
  timeZone: string;
};

export function CurrentLocalTimeItem({ timeZone }: CurrentLocalTimeItemProps) {
  const [timeString, setTimeString] = useState<string>("");
  const [diffText, setDiffText] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Get time in target timezone using TZDate
      const targetTime = TZDate.tz(timeZone);
      const formattedTime = format(targetTime, "HH:mm");
      setTimeString(formattedTime);

      // Calculate timezone offset difference using tzOffset
      const viewerOffset = -now.getTimezoneOffset(); // in minutes
      const targetOffset = tzOffset(timeZone, now); // in minutes

      const minutesDiff = Math.abs(targetOffset - viewerOffset);
      const hoursDiff = minutesDiff / 60;

      let diff = "";
      if (hoursDiff < 1) {
        diff = " // same time";
      } else {
        const hours = Math.floor(hoursDiff);
        const isAhead = targetOffset > viewerOffset;
        diff = ` // ${hours}h ${isAhead ? "ahead" : "behind"}`;
      }
      setDiffText(diff);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [timeZone]);

  if (!timeString) {
    return (
      <IntroItem>
        <IntroItemIcon>
          <ClockIcon />
        </IntroItemIcon>

        <IntroItemContent>—:—</IntroItemContent>
      </IntroItem>
    );
  }

  return (
    <IntroItem>
      <IntroItemIcon>
        <ClockIcon />
      </IntroItemIcon>

      <IntroItemContent aria-label={`Current local time: ${timeString}`}>
        <span>{timeString}</span>
        <span className="text-muted-foreground" aria-hidden="true">
          {diffText}
        </span>
      </IntroItemContent>
    </IntroItem>
  );
}
