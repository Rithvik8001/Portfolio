import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import { aboutMe } from "@/lib/utils";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    temperature: 0.5,
    messages: convertToCoreMessages(messages),
    system: aboutMe(),
  });

  return result.toDataStreamResponse();
}
