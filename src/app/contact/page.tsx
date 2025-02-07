"use client";

import ContactListPage from "@/components/Contacts";
import { useSession, signIn, signOut } from "next-auth/react";
 // Import the contact list component

const ContactPage = () => {
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
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Welcome, {session.user?.name || "User"}!</h1>
      <button
        onClick={() => signOut()}
        className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Sign Out
      </button>

      {/* Contact List Component */}
      <ContactListPage />
    </div>
  );
};

export default ContactPage;
