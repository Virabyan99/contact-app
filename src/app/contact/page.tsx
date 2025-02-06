'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Contact Management App</h1>
      <p className="mb-6">
        Welcome to the Contact Management App built with Next.js and shadcn/ui!
      </p>
      <Button variant="default" onClick={() => alert('Button Clicked!')}>
        Get Started
      </Button>
    </div>
  )
}

export default ContactPage
