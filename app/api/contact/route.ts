import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ok: true, message: "Contact endpoint ready for implementation." });
}
