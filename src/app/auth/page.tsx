"use client"

import { signIn } from "next-auth/react"

const SignIn = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Sign In</h1>
      <p className="mb-6">Choose a provider to sign in:</p>
      <button
        onClick={() => signIn("github")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Sign in with GitHub
      </button>
    </div>
  )
}

export default SignIn
