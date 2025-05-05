import { aboutMe } from "@/lib/utils";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";

export const maxDuration = 30;

const openAI = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openAI("gpt-4.1-nano"),
    temperature: 0.5,
    messages: convertToCoreMessages(messages),
    system: aboutMe(),
  });

  return result.toDataStreamResponse();
}
