"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Target, AlertCircle, Sparkles, BookOpen, Briefcase, FileText, Activity, Brain } from "lucide-react"

interface GoalInputFormProps {
  onPlanGenerated: (plan: any) => void
}

export default function GoalInputForm({ onPlanGenerated }: GoalInputFormProps) {
  const [formData, setFormData] = useState({
    goal: "",
    duration: "",
    dailyTime: "",
    preferredDays: "",
    mode: "Learning",
    experience: "",
  })
  const [errors, setErrors] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState("")

  const modes = [
    { value: "Learning", icon: BookOpen, description: "Focus on skill development and knowledge acquisition" },
    { value: "Career", icon: Briefcase, description: "Career advancement and professional growth" },
    { value: "Assignment", icon: FileText, description: "Academic assignments and project deadlines" },
    { value: "Habit", icon: Activity, description: "Building healthy habits and routines" },
  ]

  const experienceLevels = [
    { value: "Beginner", description: "New to this topic" },
    { value: "Some Experience", description: "Have some basic knowledge" },
    { value: "Intermediate", description: "Comfortable with fundamentals" },
    { value: "Advanced", description: "Looking to deepen expertise" },
  ]

  const validateForm = () => {
    const newErrors: string[] = []

    if (!formData.goal.trim()) {
      newErrors.push("Please enter your goal")
    } else if (formData.goal.trim().length < 10) {
      newErrors.push("Please provide a more detailed goal (at least 10 characters)")
    }

    if (!formData.duration) {
      newErrors.push("Please select a duration")
    }
    if (!formData.dailyTime) {
      newErrors.push("Please specify daily available time")
    }
    if (!formData.mode) {
      newErrors.push("Please select a mode")
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const generateAIPlan = async () => {
    const apiKey = "w0hEVmnrWfVM8JmNmwhG7YCMSDp68uMvMGbAQJkE" // Your Cohere API key

    setGenerationStep("Analyzing your goal with Cohere AI...")

    // Calculate duration in weeks
    const durationWeeks = formData.duration.includes("month")
      ? Number.parseInt(formData.duration) * 4
      : formData.duration.includes("week")
        ? Number.parseInt(formData.duration)
        : Number.parseInt(formData.duration) * 52

    const prompt = `Create a comprehensive learning roadmap for the following goal:

GOAL: ${formData.goal}
DURATION: ${formData.duration} (${durationWeeks} weeks)
DAILY TIME: ${formData.dailyTime}
MODE: ${formData.mode}
EXPERIENCE LEVEL: ${formData.experience || "Not specified"}
PREFERRED SCHEDULE: ${formData.preferredDays || "Flexible"}

Please create a detailed learning plan with the following structure:

WEEKLY BREAKDOWN:
For each of the ${durationWeeks} weeks, provide:
- Week number and title
- 3-5 specific topics to cover
- Brief description of what will be accomplished
- Practical exercises or projects

LEARNING TIPS:
Provide 5-7 actionable learning tips specific to this goal

MILESTONES:
Define 3-5 key milestones with specific deliverables

DAILY TASKS:
Create specific daily tasks for the first 2 weeks

Make the plan:
1. Realistic for the given timeframe and daily commitment
2. Progressive in difficulty from beginner to advanced
3. Includes hands-on practice and projects
4. Appropriate for ${formData.mode} mode
5. Considers ${formData.experience || "beginner"} experience level

Format the response clearly with headers and bullet points.`

    try {
      setGenerationStep("Generating personalized roadmap...")

      const response = await fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Cohere-Version": "2022-12-06",
        },
        body: JSON.stringify({
          model: "command",
          prompt: prompt,
          max_tokens: 2000,
          temperature: 0.7,
          k: 0,
          stop_sequences: [],
          return_likelihoods: "NONE",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Cohere API error: ${errorData.message || response.statusText}`)
      }

      const data = await response.json()
      const aiResponse = data.generations[0].text

      setGenerationStep("Processing AI response...")

      // Parse the AI response and structure it
      const structuredPlan = parseAIResponse(aiResponse, formData, durationWeeks)

      setGenerationStep("Finalizing your plan...")

      return structuredPlan
    } catch (error) {
      console.error("Cohere API error:", error)
      throw error
    }
  }

  const parseAIResponse = (aiResponse: string, formData: any, durationWeeks: number) => {
    // Parse the AI response and extract structured data
    const lines = aiResponse.split("\n").filter((line) => line.trim())

    const plan = {
      id: Date.now(),
      goal: formData.goal,
      duration: formData.duration,
      dailyTime: formData.dailyTime,
      mode: formData.mode,
      preferredDays: formData.preferredDays,
      experience: formData.experience,
      createdAt: new Date().toISOString(),
      aiGenerated: true,
      cohereGenerated: true,
      weeks: [],
      tips: [],
      milestones: [],
      dailySchedule: [],
      rawAIResponse: aiResponse,
    }

    // Extract weeks
    const weeks = []
    let currentWeek = null
    let weekCounter = 1

    for (const line of lines) {
      const trimmedLine = line.trim()

      // Detect week headers
      if (
        trimmedLine.toLowerCase().includes("week") &&
        (trimmedLine.includes(":") || trimmedLine.toLowerCase().includes("title"))
      ) {
        if (currentWeek) {
          weeks.push(currentWeek)
        }
        currentWeek = {
          week: weekCounter++,
          title: trimmedLine.replace(/week\s*\d*:?\s*/i, "").trim(),
          topics: [],
          description: "",
        }
      }
      // Extract topics (lines starting with - or •)
      else if (currentWeek && (trimmedLine.startsWith("-") || trimmedLine.startsWith("•"))) {
        const topic = trimmedLine.replace(/^[-•]\s*/, "").trim()
        if (topic && currentWeek.topics.length < 5) {
          currentWeek.topics.push(topic)
        }
      }
      // Extract description
      else if (
        currentWeek &&
        trimmedLine &&
        !trimmedLine.toLowerCase().includes("tip") &&
        !trimmedLine.toLowerCase().includes("milestone")
      ) {
        if (!currentWeek.description && trimmedLine.length > 20) {
          currentWeek.description = trimmedLine
        }
      }
    }

    if (currentWeek) {
      weeks.push(currentWeek)
    }

    // If we don't have enough weeks, generate some based on the goal
    while (weeks.length < Math.min(durationWeeks, 12)) {
      const weekNum = weeks.length + 1
      weeks.push({
        week: weekNum,
        title: `${formData.goal.split(" ")[0]} - Week ${weekNum}`,
        topics: [
          `Continue learning ${formData.goal.toLowerCase()}`,
          "Practice exercises",
          "Review previous concepts",
          "Work on projects",
        ],
        description: `Focus on advancing your ${formData.goal.toLowerCase()} skills`,
      })
    }

    plan.weeks = weeks.slice(0, durationWeeks)

    // Extract tips
    const tips = []
    let inTipsSection = false
    for (const line of lines) {
      const trimmedLine = line.trim()
      if (trimmedLine.toLowerCase().includes("tip") && trimmedLine.includes(":")) {
        inTipsSection = true
        continue
      }
      if (inTipsSection && (trimmedLine.startsWith("-") || trimmedLine.startsWith("•"))) {
        const tip = trimmedLine.replace(/^[-•]\s*/, "").trim()
        if (tip) {
          tips.push(tip)
        }
      }
      if (inTipsSection && trimmedLine.toLowerCase().includes("milestone")) {
        inTipsSection = false
      }
    }

    plan.tips = tips.slice(0, 7)

    // Extract milestones
    const milestones = []
    let inMilestonesSection = false
    for (const line of lines) {
      const trimmedLine = line.trim()
      if (trimmedLine.toLowerCase().includes("milestone") && trimmedLine.includes(":")) {
        inMilestonesSection = true
        continue
      }
      if (inMilestonesSection && (trimmedLine.startsWith("-") || trimmedLine.startsWith("•"))) {
        const milestone = trimmedLine.replace(/^[-•]\s*/, "").trim()
        if (milestone) {
          milestones.push(milestone)
        }
      }
    }

    plan.milestones = milestones.slice(0, 5)

    // Generate daily schedule
    plan.dailySchedule = generateDailyScheduleFromWeeks(plan.weeks, formData)

    return plan
  }

  const generateDailyScheduleFromWeeks = (weeks: any[], formData: any) => {
    const schedule = []
    const today = new Date()
    const totalDays = Math.min(weeks.length * 7, 90) // Max 90 days

    for (let day = 0; day < totalDays; day++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + day)

      const weekNumber = Math.floor(day / 7) + 1
      const currentWeek = weeks.find((w: any) => w.week === weekNumber) || weeks[0]

      if (currentWeek && currentWeek.topics) {
        const dayOfWeek = day % 7
        const topicIndex = dayOfWeek % currentWeek.topics.length

        let task = currentWeek.topics[topicIndex]

        // Add variety based on day of week
        if (dayOfWeek === 0) task = `Week ${weekNumber} Overview: ${currentWeek.title}`
        if (dayOfWeek === 6) task = `Week ${weekNumber} Review: ${currentWeek.description || "Review and practice"}`

        schedule.push({
          date: currentDate.toISOString().split("T")[0],
          task: task,
          duration: formData.dailyTime,
          completed: false,
          week: weekNumber,
          weekTitle: currentWeek.title,
          type: dayOfWeek % 2 === 0 ? "theory" : "practice",
        })
      }
    }

    return schedule
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsGenerating(true)
    setErrors([])
    setGenerationStep("Preparing AI analysis...")

    try {
      const generatedPlan = await generateAIPlan()

      // Save to localStorage
      const savedPlans = JSON.parse(localStorage.getItem("schedulai-plans") || "[]")
      savedPlans.push(generatedPlan)
      localStorage.setItem("schedulai-plans", JSON.stringify(savedPlans))

      onPlanGenerated(generatedPlan)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to generate plan. Please try again."
      setErrors([errorMessage])
    } finally {
      setIsGenerating(false)
      setGenerationStep("")
    }
  }

  const selectedMode = modes.find((mode) => mode.value === formData.mode)

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-emerald-600" />
          <span>Create Your AI-Powered Learning Plan</span>
        </CardTitle>
        <CardDescription>
          Tell us about your goal and our Cohere AI will create a comprehensive, personalized roadmap for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cohere AI Badge */}
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              🤖 Powered by Cohere AI
            </div>
          </div>

          {/* Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Mode</label>
            <div className="grid grid-cols-2 gap-2">
              {modes.map((mode) => (
                <Button
                  key={mode.value}
                  type="button"
                  variant={formData.mode === mode.value ? "default" : "outline"}
                  className={`p-3 h-auto flex flex-col items-center space-y-1 ${
                    formData.mode === mode.value ? "bg-emerald-600 hover:bg-emerald-700" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, mode: mode.value })}
                >
                  <mode.icon className="h-4 w-4" />
                  <span className="text-xs">{mode.value}</span>
                </Button>
              ))}
            </div>
            {selectedMode && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{selectedMode.description}</p>
            )}
          </div>

          {/* Goal Input */}
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What's your goal? *
            </label>
            <Textarea
              id="goal"
              placeholder="e.g., Learn full-stack web development with React and Node.js to build modern web applications, Master data science with Python including machine learning and data visualization, Complete my computer science degree with focus on algorithms and system design..."
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Be specific about what you want to learn and achieve. The more details you provide, the better your
              AI-generated plan will be.
            </p>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your experience level
            </label>
            <Select
              value={formData.experience}
              onValueChange={(value) => setFormData({ ...formData, experience: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <div>
                      <div className="font-medium">{level.value}</div>
                      <div className="text-sm text-gray-500">{level.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration *</label>
            <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2 weeks">2 weeks</SelectItem>
                <SelectItem value="1 month">1 month</SelectItem>
                <SelectItem value="2 months">2 months</SelectItem>
                <SelectItem value="3 months">3 months</SelectItem>
                <SelectItem value="6 months">6 months</SelectItem>
                <SelectItem value="1 year">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Daily Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily available time *
            </label>
            <Select
              value={formData.dailyTime}
              onValueChange={(value) => setFormData({ ...formData, dailyTime: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="How much time per day?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5 hours">30 minutes</SelectItem>
                <SelectItem value="1 hour">1 hour</SelectItem>
                <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                <SelectItem value="2 hours">2 hours</SelectItem>
                <SelectItem value="3 hours">3 hours</SelectItem>
                <SelectItem value="4 hours">4+ hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Days */}
          <div>
            <label htmlFor="preferredDays" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preferred schedule (optional)
            </label>
            <Input
              id="preferredDays"
              placeholder="e.g., Monday to Friday, Weekends only, Every day, Flexible..."
              value={formData.preferredDays}
              onChange={(e) => setFormData({ ...formData, preferredDays: e.target.value })}
            />
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-600 dark:text-red-400">
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Generation Progress */}
          {isGenerating && (
            <Alert className="border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20">
              <Brain className="h-4 w-4 text-emerald-600 animate-pulse" />
              <AlertDescription className="text-emerald-600 dark:text-emerald-400">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>{generationStep}</span>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Brain className="mr-2 h-4 w-4 animate-pulse" />
                Cohere AI is Creating Your Plan...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate AI-Powered Plan
              </>
            )}
          </Button>

          {!isGenerating && (
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              🤖 Powered by Cohere AI • Personalized roadmaps in seconds
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
