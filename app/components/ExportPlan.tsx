"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, Share2, CheckCircle } from "lucide-react"

interface ExportPlanProps {
  plan: any
}

export default function ExportPlan({ plan }: ExportPlanProps) {
  const [exportFormat, setExportFormat] = useState("pdf")
  const [isExporting, setIsExporting] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)

  const generatePDFContent = () => {
    let content = `
# ${plan.goal}

**Duration:** ${plan.duration}
**Daily Time:** ${plan.dailyTime}
**Mode:** ${plan.mode}
**Created:** ${new Date(plan.createdAt).toLocaleDateString()}

## Weekly Roadmap

`

    plan.weeks.forEach((week: any) => {
      content += `### Week ${week.week}: ${week.title}\n\n`
      week.topics.forEach((topic: string) => {
        content += `- ${topic}\n`
      })
      content += "\n"
    })

    content += `## Daily Schedule\n\n`

    plan.dailySchedule?.slice(0, 14).forEach((task: any) => {
      const date = new Date(task.date).toLocaleDateString()
      content += `**${date}:** ${task.task} (${task.duration})\n`
    })

    return content
  }

  const generateJSONContent = () => {
    return JSON.stringify(plan, null, 2)
  }

  const generateCSVContent = () => {
    let csv = "Date,Task,Duration,Week,Completed\n"

    plan.dailySchedule?.forEach((task: any) => {
      csv += `"${task.date}","${task.task}","${task.duration}","${task.weekTitle}","${task.completed}"\n`
    })

    return csv
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleExport = async () => {
    setIsExporting(true)
    setExportSuccess(false)

    try {
      // Simulate export processing time
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const goalName = plan.goal.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 30)
      const timestamp = new Date().toISOString().split("T")[0]

      let content: string
      let filename: string
      let mimeType: string

      switch (exportFormat) {
        case "pdf":
          // In a real app, you'd use a PDF library like jsPDF
          content = generatePDFContent()
          filename = `ApexPlanner_${goalName}_${timestamp}.txt` // Using .txt for demo
          mimeType = "text/plain"
          break
        case "json":
          content = generateJSONContent()
          filename = `ApexPlanner_${goalName}_${timestamp}.json`
          mimeType = "application/json"
          break
        case "csv":
          content = generateCSVContent()
          filename = `ApexPlanner_${goalName}_${timestamp}.csv`
          mimeType = "text/csv"
          break
        default:
          throw new Error("Invalid export format")
      }

      downloadFile(content, filename, mimeType)
      setExportSuccess(true)

      // Reset success state after 3 seconds
      setTimeout(() => setExportSuccess(false), 3000)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const shareToCalendar = () => {
    // Generate calendar event for the first task
    const firstTask = plan.dailySchedule?.[0]
    if (firstTask) {
      const startDate = new Date(firstTask.date)
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour duration

      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(firstTask.task)}&dates=${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&details=${encodeURIComponent(`Part of: ${plan.goal}`)}`

      window.open(calendarUrl, "_blank")
    }
  }

  const exportFormats = [
    { value: "pdf", label: "PDF Document", description: "Formatted document with full roadmap" },
    { value: "json", label: "JSON Data", description: "Raw data for developers" },
    { value: "csv", label: "CSV Spreadsheet", description: "Daily schedule in spreadsheet format" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="h-5 w-5 text-purple-600" />
          <span>Export Your Plan</span>
        </CardTitle>
        <CardDescription>Download your personalized learning roadmap in various formats</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Export Format Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Choose Export Format
          </label>
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              {exportFormats.map((format) => (
                <SelectItem key={format.value} value={format.value}>
                  <div>
                    <div className="font-medium">{format.label}</div>
                    <div className="text-sm text-gray-500">{format.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Export Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            {isExporting ? (
              <>
                <Download className="mr-2 h-4 w-4 animate-spin" />
                Generating {exportFormat.toUpperCase()}...
              </>
            ) : exportSuccess ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Downloaded Successfully!
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download {exportFormat.toUpperCase()}
              </>
            )}
          </Button>

          <Button variant="outline" onClick={shareToCalendar} className="w-full">
            <Calendar className="mr-2 h-4 w-4" />
            Add to Google Calendar
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "My ApexPlanner Learning Plan",
                  text: `Check out my learning plan: ${plan.goal}`,
                  url: window.location.href,
                })
              } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(`Check out my learning plan: ${plan.goal} - ${window.location.href}`)
              }
            }}
            className="w-full"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Plan
          </Button>
        </div>

        {/* Export Preview */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Export Preview
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Goal:</span>
              <span className="font-medium text-right max-w-48 truncate">{plan.goal}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span className="font-medium">{plan.duration}</span>
            </div>
            <div className="flex justify-between">
              <span>Weekly Plans:</span>
              <span className="font-medium">{plan.weeks?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Daily Tasks:</span>
              <span className="font-medium">{plan.dailySchedule?.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="grid grid-cols-2 gap-3">
          <Badge variant="outline" className="justify-center p-2">
            <FileText className="h-3 w-3 mr-1" />
            Full Roadmap
          </Badge>
          <Badge variant="outline" className="justify-center p-2">
            <Calendar className="h-3 w-3 mr-1" />
            Daily Schedule
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
