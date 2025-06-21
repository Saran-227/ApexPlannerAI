"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft, ChevronRight, CheckCircle, Circle, Clock } from "lucide-react"

interface SmartCalendarProps {
  plan: any
}

export default function SmartCalendar({ plan }: SmartCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getTaskForDate = (date: Date) => {
    if (!plan?.dailySchedule) return null

    const dateString = date.toISOString().split("T")[0]
    return plan.dailySchedule.find((task: any) => task.date === dateString)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const selectedTask = selectedDate ? plan?.dailySchedule?.find((task: any) => task.date === selectedDate) : null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-emerald-600" />
          <span>Smart Calendar</span>
        </CardTitle>
        <CardDescription>Your personalized learning schedule with daily tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={index} className="p-2 h-12"></div>
                }

                const task = getTaskForDate(day)
                const dateString = day.toISOString().split("T")[0]
                const isToday = day.toDateString() === new Date().toDateString()
                const isSelected = selectedDate === dateString
                const hasTask = !!task

                return (
                  <button
                    key={day.getDate()}
                    onClick={() => setSelectedDate(dateString)}
                    className={`
                      p-2 h-12 text-sm rounded-lg border transition-all duration-200 relative
                      ${isToday ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-gray-200 dark:border-gray-700"}
                      ${isSelected ? "ring-2 ring-emerald-500 bg-emerald-100 dark:bg-emerald-900/30" : ""}
                      ${hasTask ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700" : ""}
                      hover:bg-gray-50 dark:hover:bg-gray-800
                    `}
                  >
                    <span className={`${isToday ? "font-bold text-emerald-700 dark:text-emerald-300" : ""}`}>
                      {day.getDate()}
                    </span>
                    {hasTask && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Task Details */}
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium mb-3 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-emerald-600" />
                {selectedDate ? `Task for ${new Date(selectedDate).toLocaleDateString()}` : "Select a date"}
              </h4>

              {selectedTask ? (
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTask.task}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Duration: {selectedTask.duration}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                      {selectedTask.weekTitle}
                    </Badge>
                  </div>

                  <Button
                    size="sm"
                    variant={selectedTask.completed ? "default" : "outline"}
                    className={selectedTask.completed ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                    onClick={() => {
                      // Toggle completion status
                      const updatedSchedule = plan.dailySchedule.map((task: any) =>
                        task.date === selectedDate ? { ...task, completed: !task.completed } : task,
                      )
                      plan.dailySchedule = updatedSchedule

                      // Update localStorage
                      const savedPlans = JSON.parse(localStorage.getItem("schedulai-plans") || "[]")
                      const updatedPlans = savedPlans.map((p: any) => (p.id === plan.id ? plan : p))
                      localStorage.setItem("schedulai-plans", JSON.stringify(updatedPlans))
                    }}
                  >
                    {selectedTask.completed ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Circle className="h-4 w-4 mr-2" />
                        Mark Complete
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {selectedDate ? "No task scheduled for this date" : "Click on a date to see the scheduled task"}
                </p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-4">
              <h4 className="font-medium mb-3">Progress Overview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Days:</span>
                  <span className="font-medium">{plan?.dailySchedule?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <span className="font-medium text-emerald-600">
                    {plan?.dailySchedule?.filter((task: any) => task.completed).length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining:</span>
                  <span className="font-medium">
                    {plan?.dailySchedule?.filter((task: any) => !task.completed).length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
