import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "created_at_desc";
  const filter = searchParams.get("filter") || "";

  try {
    const response = await fetch("http://localhost:8787/api/contacts");
    if (!response.ok) throw new Error("Failed to fetch contacts");

    let { contacts } = await response.json();

    // 🔹 Apply search filter
    if (search) {
      contacts = contacts.filter(
        (contact: any) =>
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          (contact.email &&
            contact.email.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // 🔹 Apply category filter
    if (filter) {
      contacts = contacts.filter((contact: any) => contact.category === filter);
    }

    // 🔹 Apply sorting
    contacts = contacts.sort((a: any, b: any) => {
      return sort === "created_at_asc"
        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return NextResponse.json({ contacts });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

// ✅ Handle Contact Creation (POST)
export async function POST(req: Request) {
  try {
    const newContact = await req.json();

    // 🔹 Basic validation: Ensure `name` is provided
    if (!newContact.name || newContact.name.trim() === "") {
      return NextResponse.json(
        { error: "Contact name is required." },
        { status: 400 }
      );
    }

    // 🔹 Send the new contact to your backend
    const response = await fetch("http://localhost:8787/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    });

    if (!response.ok) {
      throw new Error("Failed to create contact.");
    }

    const createdContact = await response.json();

    return NextResponse.json(createdContact, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create contact." },
      { status: 500 }
    );
  }
}
