import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

export const runtime = 'nodejs'; // Force Node.js runtime for this route

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
