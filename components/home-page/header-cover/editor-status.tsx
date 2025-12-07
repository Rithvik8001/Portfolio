"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

type WakaTimeData = {
  isOnline: boolean;
  editor: "Cursor" | null;
  status: string;
  yesterdayCodingTime: string;
  todayCodingTime: string;
};

export function EditorStatus() {
  const [data, setData] = useState<WakaTimeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/wakatime");
        if (res.ok) {
          const json = (await res.json()) as WakaTimeData;

          setData(json);
        } else {
          console.error("Failed to fetch WakaTime status:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching WakaTime status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data)
    return (
      <div className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border border-border bg-background p-1.5 ring-2 ring-background">
        <div
          className={cn(
            "size-full rounded-full border border-white/10",
            "bg-zinc-500"
          )}
        />
      </div>
    );

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border border-border bg-background p-1.5 ring-2 ring-background">
            <div
              className={cn(
                "size-full rounded-full border border-white/10",
                data.isOnline ? "bg-emerald-500" : "bg-zinc-500"
              )}
            />
            {data.isOnline && (
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-75" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          className="flex flex-col gap-1 p-3"
        >
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "size-2 rounded-full",
                data.isOnline ? "bg-emerald-500" : "bg-zinc-500"
              )}
            />
            <span className="flex flex-wrap items-center gap-2 font-medium">
              {data.isOnline ? "Online" : "Offline"} in{" "}
              <Image
                src="/assets/tech-icons/cursor-light.svg"
                alt="Cursor"
                width={16}
                height={16}
                className="hidden dark:block"
                unoptimized
              />
              <Image
                src="/assets/tech-icons/cursor-dark.svg"
                alt="Cursor"
                width={16}
                height={16}
                className="block dark:hidden"
                unoptimized
              />
              Cursor
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Yesterday Worked for{" "}
            <span className="font-medium">{data.yesterdayCodingTime}</span>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
