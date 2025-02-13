"use server";
import { EmailTemplate } from "../../../components/emailTemplates/contattaciTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: any, res: any) {
  const body = await req.json();

  const { name, email, message } = body;

  if (!message || !email || !name) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const data = await resend.emails.send({
      from: `${name} <onboarding@resend.dev>`,
      to: ["rithvik.utd@outlook.com"],
      subject: `New Email from ${name}`,
      text: "Email text",
      react: EmailTemplate({
        name: name,
        message: message,
        email: email,
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
