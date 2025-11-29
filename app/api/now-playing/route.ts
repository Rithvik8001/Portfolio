import { getNowPlaying, getRecentlyPlayed } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const response = await getNowPlaying();

    // 204 No Content means nothing is currently playing
    if (response.status === 204 || response.status > 400) {
      // Fallback to recently played
      const recentlyPlayed = await getRecentlyPlayed();

      if (recentlyPlayed.status !== 200) {
        return NextResponse.json({ isPlaying: false });
      }

      const data = (await recentlyPlayed.json()) as any;
      if (!data.items || data.items.length === 0) {
        return NextResponse.json({ isPlaying: false });
      }

      const track = data.items[0].track;
      const title = track.name;
      const artist = track.artists
        .map((_artist: any) => _artist.name)
        .join(", ");
      const album = track.album.name;
      const albumImageUrl = track.album.images[0].url;
      const songUrl = track.external_urls.spotify;

      return NextResponse.json({
        album,
        albumImageUrl,
        artist,
        isPlaying: false,
        songUrl,
        title,
      });
    }

    const song = (await response.json()) as any;

    // If the song is playing but it's a podcast or something else that doesn't have the expected structure
    if (song.item === null) {
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists
      .map((_artist: any) => _artist.name)
      .join(", ");
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return NextResponse.json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    });
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return NextResponse.json({ isPlaying: false });
  }
}
