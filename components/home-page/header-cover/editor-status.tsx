"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { WakaTimeStatus } from "@/types";

export function EditorStatus() {
  const [data, setData] = useState<WakaTimeStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    let isFetching = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const fetchData = async () => {
      if (isFetching) return;
      isFetching = true;

      try {
        const res = await fetch("/api/wakatime");
        if (res.ok) {
          const json = (await res.json()) as WakaTimeStatus;

          if (isActive) setData(json);
        } else {
          console.error("Failed to fetch WakaTime status:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching WakaTime status:", error);
      } finally {
        isFetching = false;
        if (isActive) setLoading(false);
      }
    };

    const stopPolling = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = undefined;
    };

    const startPolling = () => {
      stopPolling();
      intervalId = setInterval(() => void fetchData(), 60_000);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stopPolling();
        return;
      }

      void fetchData();
      startPolling();
    };

    void fetchData();
    if (document.visibilityState === "visible") startPolling();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isActive = false;
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (loading || !data)
    return (
      <div className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border border-border bg-background p-1.5 ring-2 ring-background">
        <div
          className={cn(
            "size-full rounded-full border border-white/10",
            "bg-zinc-500",
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
                data.isOnline ? "bg-emerald-500" : "bg-zinc-500",
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
                data.isOnline ? "bg-emerald-500" : "bg-zinc-500",
              )}
            />
            <span className="flex flex-wrap items-center gap-2 font-medium">
              {data.isOnline ? "Online" : "Offline"} in{" "}
              <Icons.zed className="size-4" aria-hidden />
              Zed
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Today <span className="font-medium">{data.todayCodingTime}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Yesterday{" "}
            <span className="font-medium">{data.yesterdayCodingTime}</span>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
