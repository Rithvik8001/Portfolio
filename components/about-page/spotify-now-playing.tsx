"use client";

import { useEffect, useState } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Panel, PanelContent } from "@/components/ui/panel";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const json = (await res.json()) as SpotifyData;
        setData(json);
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Poll every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return null;
  }

  return (
    <Panel>
      <PanelContent className="pr-2">
        <div className="flex w-full items-center justify-between gap-3">
          {data.albumImageUrl && (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted">
              <img
                src={data.albumImageUrl}
                alt={data.album}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="relative flex h-3 w-3 items-center justify-center rounded-full bg-[#1DB954]/20 text-[#1DB954]">
                <Image
                  src={`/assets/tech-icons/spotify.svg`}
                  alt="Spotify icon"
                  width={12}
                  height={12}
                  unoptimized
                />
                {data.isPlaying && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#1DB954]/40" />
                )}
              </div>
              <span>{data.isPlaying ? "Listening to" : "Last played"}</span>
            </div>
            <Link
              href={data.songUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate font-medium hover:underline"
            >
              {data.title}
            </Link>
            <p className="truncate text-xs text-muted-foreground">
              by {data.artist}
            </p>
          </div>
          {data.songUrl && (
            <Link href={data.songUrl} target="_blank" rel="noopener noreferrer">
              <ArrowUpRightIcon className="size-4 text-muted-foreground" />
              <span className="sr-only">Open in Spotify</span>
            </Link>
          )}
        </div>
      </PanelContent>
    </Panel>
  );
}
