import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://localhost:8787/api/contacts");
    if (!response.ok) throw new Error("Failed to fetch contacts");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}
