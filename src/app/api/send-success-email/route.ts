import { NextResponse } from 'next/server';
import { transporter } from '@/lib/nodemailer';

export async function POST(req: Request) {
  const { to, subject, text } = await req.json();

  await transporter.sendMail({
    from: '"My Shop" <your@gmail.com>',
    to,
    subject,
    text,
  });

  return NextResponse.json({ ok: true });
}
