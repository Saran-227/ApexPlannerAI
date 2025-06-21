import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ApexPlanner - Turn Your Goals Into Daily Wins with AI",
  description:
    "An agentic AI calendar assistant that breaks down learning goals, assignments, and habits into structured schedules — all within a smart, balanced calendar.",
  keywords: "AI calendar, goal planning, productivity, schedule assistant, learning planner",
  authors: [{ name: "ApexPlanner Team" }],
  openGraph: {
    title: "ApexPlanner - AI-Powered Smart Calendar Assistant",
    description: "Transform your goals into actionable daily plans with AI-powered scheduling.",
    type: "website",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
