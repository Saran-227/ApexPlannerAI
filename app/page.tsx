"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Calendar,
  Target,
  Brain,
  BarChart3,
  Bell,
  Download,
  ChevronRight,
  Github,
  Linkedin,
  Moon,
  Sun,
  Menu,
  X,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"
import GoalInputForm from "./components/GoalInputForm"
import SmartCalendar from "./components/SmartCalendar"
import ReminderSystem from "./components/ReminderSystem"
import ExportPlan from "./components/ExportPlan"
import EnhancedRoadmapDisplay from "./components/EnhancedRoadmapDisplay"
import CohereInsights from "./components/CohereInsights"

export default function ApexPlannerWebsite() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCalendarMode, setSelectedCalendarMode] = useState("Learning")
  const [currentPlan, setCurrentPlan] = useState(null)
  const [showFunctionalDemo, setShowFunctionalDemo] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const features = [
    {
      icon: Target,
      title: "Goal-to-Roadmap Generation",
      description:
        "Transform any long-term goal into a structured, actionable roadmap with Cohere AI-powered planning.",
    },
    {
      icon: Brain,
      title: "Career Path Planner",
      description: "Get personalized career guidance and skill development plans tailored to your aspirations.",
    },
    {
      icon: Calendar,
      title: "Assignment & Deadline Scheduler",
      description: "Never miss a deadline with intelligent scheduling that balances all your commitments.",
    },
    {
      icon: Users,
      title: "Balanced Life Mode",
      description: "Maintain perfect work-life balance with integrated study, fitness, and hobby scheduling.",
    },
    {
      icon: BarChart3,
      title: "Habit Tracker with Smart Feedback",
      description: "Build lasting habits with AI-powered insights and personalized feedback loops.",
    },
    {
      icon: Bell,
      title: "Daily Reminders",
      description: "Stay on track with intelligent email and app-based notifications.",
    },
    {
      icon: Download,
      title: "Export Plan as PDF",
      description: "Take your plans offline with beautifully formatted PDF exports.",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Enter Your Goal",
      description: "Simply describe what you want to achieve",
      example: '"Learn SQL & Java in 3 months"',
    },
    {
      number: "02",
      title: "Cohere AI Generates Roadmap",
      description: "Our AI creates a personalized weekly learning plan",
      example: "Week 1: SQL Basics, Week 2: Advanced Queries...",
    },
    {
      number: "03",
      title: "Daily Calendar View",
      description: "See exactly what to do each day in your calendar",
      example: "Today: 2 hours SQL practice, 1 hour Java tutorial",
    },
    {
      number: "04",
      title: "Track & Optimize",
      description: "Get reminders and track your progress",
      example: "Daily check-ins, habit tracking, smart adjustments",
    },
  ]

  const calendarModes = ["Learning", "Career", "Assignment"]

  const mockCalendarData = {
    Learning: [
      { time: "9:00 AM", task: "SQL Fundamentals - Chapter 3", type: "study" },
      { time: "11:00 AM", task: "Java Practice Problems", type: "practice" },
      { time: "2:00 PM", task: "Database Design Project", type: "project" },
      { time: "4:00 PM", task: "Code Review & Reflection", type: "review" },
    ],
    Career: [
      { time: "9:00 AM", task: "LinkedIn Profile Optimization", type: "networking" },
      { time: "10:30 AM", task: "Portfolio Project Development", type: "project" },
      { time: "2:00 PM", task: "Industry Research & Trends", type: "research" },
      { time: "3:30 PM", task: "Mock Interview Practice", type: "practice" },
    ],
    Assignment: [
      { time: "9:00 AM", task: "Data Structures Assignment", type: "assignment" },
      { time: "11:00 AM", task: "Algorithm Analysis Report", type: "report" },
      { time: "2:00 PM", task: "Group Project Meeting", type: "meeting" },
      { time: "4:00 PM", task: "Final Review & Submission", type: "review" },
    ],
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image src="/apex-logo.png" alt="ApexPlanner Logo" width={32} height={32} className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">ApexPlanner</span>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">Cohere Powered</Badge>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors">
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
              >
                How It Works
              </a>
              <a href="#demo" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors">
                Demo
              </a>
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors">
                Contact
              </a>
              <Button variant="ghost" size="sm" onClick={() => setDarkMode(!darkMode)} className="p-2">
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setDarkMode(!darkMode)} className="p-2">
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600">
                Features
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600"
              >
                How It Works
              </a>
              <a href="#demo" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600">
                Demo
              </a>
              <a href="#about" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600">
                About
              </a>
              <a href="#contact" className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600">
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <Image src="/apex-logo.png" alt="ApexPlanner Logo" width={64} height={64} className="w-16 h-16" />
              <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ApexPlanner
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
              Turn Your Goals Into Daily Wins with Cohere AI
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              An intelligent AI calendar assistant powered by Cohere that breaks down learning goals, assignments, and
              habits into structured schedules — all within a smart, balanced calendar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
                onClick={() => setShowFunctionalDemo(true)}
              >
                Try Cohere AI Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                View Roadmap
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Functional Demo Section */}
      {showFunctionalDemo && (
        <section
          id="demo"
          className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">🚀 Cohere AI Demo</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience ApexPlanner powered by Cohere! Enter your goal and watch as advanced AI creates your
                personalized learning roadmap.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Goal Input Form */}
              <GoalInputForm onPlanGenerated={setCurrentPlan} />

              {/* Enhanced Roadmap Display */}
              <EnhancedRoadmapDisplay plan={currentPlan} />
            </div>

            {/* Calendar and Additional Features */}
            {currentPlan && (
              <div className="space-y-8">
                <SmartCalendar plan={currentPlan} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <ReminderSystem plan={currentPlan} />
                  <ExportPlan plan={currentPlan} />
                  <CohereInsights plan={currentPlan} />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transform your goals into actionable daily plans in just four simple steps with Cohere AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-purple-200 dark:hover:border-purple-700">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">{step.number}</span>
                    </div>
                    <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300 italic">{step.example}</p>
                    </div>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Core Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful Cohere AI-driven features designed to transform how you plan and achieve your goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-purple-200 dark:hover:border-purple-700"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Preview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Calendar Preview</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              See how ApexPlanner organizes your day across different modes
            </p>

            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex space-x-1">
                {calendarModes.map((mode) => (
                  <Button
                    key={mode}
                    variant={selectedCalendarMode === mode ? "default" : "ghost"}
                    onClick={() => setSelectedCalendarMode(mode)}
                    className={
                      selectedCalendarMode === mode
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        : ""
                    }
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span>Today's Schedule - {selectedCalendarMode} Mode</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCalendarData[selectedCalendarMode as keyof typeof mockCalendarData].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className="text-purple-600 border-purple-600">
                        {item.time}
                      </Badge>
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900 dark:text-white">{item.task}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{item.type}</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-gray-400 hover:text-purple-600 cursor-pointer transition-colors" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About the AI Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">About Cohere AI</h2>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                <p>
                  ApexPlanner leverages Cohere's advanced language models to intelligently break down complex goals into
                  manageable daily tasks. Cohere AI understands context, priorities, and optimal scheduling patterns.
                </p>
                <p>
                  The system uses Cohere's sophisticated natural language processing to balance your learning objectives
                  with personal commitments, ensuring sustainable progress without burnout.
                </p>
                <p>
                  Built with Cohere's Command model, ApexPlanner represents the future of personalized productivity and
                  intelligent learning assistance.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Cohere AI</Badge>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Next.js</Badge>
                <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  TypeScript
                </Badge>
                <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">Tailwind CSS</Badge>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-700">
                <div className="text-center">
                  <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Cohere AI-Powered Intelligence
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Advanced language models that understand your learning patterns and optimize your schedule for
                    maximum productivity and well-being.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Get Early Access</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Be among the first to experience the future of Cohere AI-powered scheduling. Join our early access program
              today.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <Input id="name" placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your goals and how ApexPlanner can help you..."
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg">
                  Get Access
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/apex-logo.png" alt="ApexPlanner Logo" width={32} height={32} className="w-8 h-8" />
                <span className="text-xl font-bold">ApexPlanner</span>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">Cohere</Badge>
              </div>
              <p className="text-gray-400 mb-4">Turn your goals into daily wins with Cohere AI-powered scheduling.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-gray-400 hover:text-purple-400 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#demo" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Built With ❤️</h3>
              <p className="text-gray-400 mb-2">Powered by Cohere AI</p>
              <p className="text-gray-400 mb-2">Created at AMD AI Sprint Hackathon</p>
              <p className="text-gray-400">IIT Bombay</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 ApexPlanner. Built with passion for productivity and powered by Cohere AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
