'use client'

import React, { useState, useEffect } from 'react'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Button } from './ui/button'

interface Contact {
  id: number
  name: string
  email?: string
  phone?: string
  category?: string
  details?: string
  photo_url?: string
  created_at: string
}

const ContactListPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<string>('created_at_desc')
  const [filter, setFilter] = useState<string>('')

  const fetchContacts = async () => {
    try {
      const queryParams = new URLSearchParams({
        search,
        sort,
        filter: filter === "all" ? "" : filter,
      });
  
      const url = `/api/contacts?${queryParams.toString()}`; // ✅ Correct API route
      console.log("Fetching data from:", url); // Debug log
  
      const res = await fetch(url);
      const contentType = res.headers.get("content-type");
  
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Expected JSON but got:", text);
        throw new Error("Invalid JSON response from API.");
      }
  
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    setLoading(true)
    fetchContacts()
  }, [search, sort, filter])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Contact Management App
      </h1>
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value || null)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">All</SelectItem>{' '}
              {/* Use a non-empty value like "none" */}
              <SelectItem value="friend">Friend</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="colleague">Colleague</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => fetchContacts()}>Refresh</Button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-600">Loading contacts...</p>
        ) : contacts.length > 0 ? (
          <ul className="space-y-4">
            {contacts.map((contact) => (
              <li
                key={contact.id}
                className="p-4 border rounded bg-white shadow">
                <h2 className="text-xl font-semibold">{contact.name}</h2>
                {contact.email && <p>Email: {contact.email}</p>}
                {contact.phone && <p>Phone: {contact.phone}</p>}
                {contact.category && (
                  <p className="italic text-sm text-gray-500">
                    Category: {contact.category}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No contacts found.</p>
        )}
      </div>
    </div>
  )
}

export default ContactListPage
