"use client";

import ContactForm from "@/components/ContactForm";
import { signIn, useSession } from "next-auth/react";

export default function NewContactPage() {
    const { data: session, status } = useSession();
    
      if (status === "loading") {
        return <div>Loading...</div>;
      }
    
      if (!session) {
        return (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="mb-4">You must be signed in to view this page.</p>
            <button
              onClick={() => signIn()}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Sign In
            </button>
          </div>
        );
      }
  return (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
      <ContactForm />
    </div>
  );
}
