'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // ✅ App Router uses `next/navigation`
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Contact {
  id?: number
  name: string
  email?: string
  phone?: string
  category?: string
  details?: string
  photo_url?: string
}

interface Props {
  contact?: Contact // Optional - Used for Edit Mode
  isEditing?: boolean
}


const ContactForm: React.FC<Props> = ({ contact, isEditing = false }) => {
  const router = useRouter()
  const [formData, setFormData] = useState<Contact>(
    contact || {
      name: '',
      email: '',
      phone: '',
      category: '',
      details: '',
      photo_url: '',
    }
  )
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (contact) setFormData(contact)
  }, [contact])

  const handleChange = (field: keyof Contact, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setError(null); // Reset any previous error
  
    // Basic validation: Ensure the contact name is provided
    if (!formData.name.trim()) {
      setError('Contact name is required.');
      return;
    }
  
    setLoading(true); // Set loading to true while the request is in progress
  
    try {
      // Determine the API endpoint based on whether we are editing or creating a contact
      const endpoint = isEditing ? `/api/contacts/${formData.id}` : '/api/contacts';
      const method = isEditing ? 'PUT' : 'POST';
  
      // Make the fetch request with the necessary headers and body data
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      // If the request fails, throw an error
      if (!res.ok) throw new Error('Failed to save contact.');
  
      // Redirect to the contact list after the contact is successfully created/updated
      router.push('/contact');
    } catch (err: any) {
      // Set the error message if there is an issue with the fetch request
      setError(err.message);
    } finally {
      setLoading(false); // Reset loading state after the request completes
    }
  };

  
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">
        {isEditing ? 'Edit Contact' : 'New Contact'}
      </h2>

      {/* Name Field */}
      <label className="block font-semibold mb-1">Name*</label>
      <Input
        type="text"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        required
      />

      {/* Email Field */}
      <label className="block font-semibold mb-1">Email</label>
      <Input
        type="email"
        value={formData.email || ''}
        onChange={(e) => handleChange('email', e.target.value)}
      />

      {/* Phone Field */}
      <label className="block font-semibold mb-1">Phone</label>
      <Input
        type="text"
        value={formData.phone || ''}
        onChange={(e) => handleChange('phone', e.target.value)}
      />

      {/* Category */}
      <label className="block font-semibold mb-1">Category</label>
      <Select
        value={formData.category || ''}
        onValueChange={(value) => handleChange('category', value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="friend">Friend</SelectItem>
          <SelectItem value="family">Family</SelectItem>
          <SelectItem value="colleague">Colleague</SelectItem>
        </SelectContent>
      </Select>

      {/* Details */}
      <label className="block font-semibold mb-1">Details</label>
      <Textarea
        value={formData.details || ''}
        onChange={(e) => handleChange('details', e.target.value)}
        rows={3}
      />

      {/* Photo URL */}
      <label className="block font-semibold mb-1">Photo URL</label>
      <Input
        type="text"
        value={formData.photo_url || ''}
        onChange={(e) => handleChange('photo_url', e.target.value)}
      />

      {error && <p className="text-red-600">{error}</p>}

      {/* Submit Button */}
      <Button type="submit" disabled={loading} className="w-full mt-4">
        {loading
          ? 'Saving...'
          : isEditing
          ? 'Update Contact'
          : 'Create Contact'}
      </Button>
    </form>
  )
}

export default ContactForm
