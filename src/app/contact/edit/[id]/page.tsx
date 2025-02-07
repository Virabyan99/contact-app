import ContactForm from "@/components/ContactForm";

// This page now uses the 'await' keyword for fetching dynamic params before using them
export default async function EditContactPage({ params }: { params: { id: string } }) {
  try {
    // Await params.id before making the API request
    const { id } = await params;  // Ensure we use the awaited param here

    // ✅ Make API request to fetch contact data
    const res = await fetch(`http://localhost:8787/api/contacts/${id}`);

    // 🔹 Check if response is valid and JSON
    if (!res.ok) {
      throw new Error(`Failed to fetch contact. Status: ${res.status}`);
    }

    const data = await res.json();

    // 🔹 Ensure data contains `contact`
    if (!data || !data.contact) {
      throw new Error("Contact not found.");
    }

    return (
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
        <ContactForm contact={data.contact} isEditing />
      </div>
    );
  } catch (error: any) {
    console.error("Error fetching contact:", error.message);
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
        <p className="text-red-600">Error loading contact: {error.message}</p>
      </div>
    );
  }
}
