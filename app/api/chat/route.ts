import { aboutMe } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body as { messages: UIMessage[] };

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: aboutMe(),
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
