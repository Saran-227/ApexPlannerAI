"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, Smartphone, Clock, CheckCircle } from "lucide-react"

interface ReminderSystemProps {
  plan: any
}

export default function ReminderSystem({ plan }: ReminderSystemProps) {
  const [email, setEmail] = useState("")
  const [remindersEnabled, setRemindersEnabled] = useState(false)
  const [reminderTime, setReminderTime] = useState("09:00")
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    // Load saved reminder settings
    const savedSettings = localStorage.getItem("schedulai-reminders")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setEmail(settings.email || "")
      setRemindersEnabled(settings.enabled || false)
      setReminderTime(settings.time || "09:00")
    }

    // Simulate daily reminders
    if (remindersEnabled && plan) {
      const interval = setInterval(() => {
        const today = new Date().toISOString().split("T")[0]
        const todayTask = plan.dailySchedule?.find((task: any) => task.date === today && !task.completed)

        if (todayTask) {
          const newNotification = {
            id: Date.now(),
            message: `Don't forget: ${todayTask.task}`,
            time: new Date().toLocaleTimeString(),
            type: "daily",
          }

          setNotifications((prev) => [newNotification, ...prev.slice(0, 4)]) // Keep only 5 notifications

          // Show browser notification if permission granted
          if (Notification.permission === "granted") {
            new Notification("SchedulAI Reminder", {
              body: newNotification.message,
              icon: "/favicon.ico",
            })
          }
        }
      }, 60000) // Check every minute (in real app, this would be more sophisticated)

      return () => clearInterval(interval)
    }
  }, [remindersEnabled, plan])

  const saveReminderSettings = () => {
    const settings = {
      email,
      enabled: remindersEnabled,
      time: reminderTime,
    }
    localStorage.setItem("schedulai-reminders", JSON.stringify(settings))

    // Simulate email subscription
    if (email && remindersEnabled) {
      const newNotification = {
        id: Date.now(),
        message: `Reminders enabled for ${email}`,
        time: new Date().toLocaleTimeString(),
        type: "success",
      }
      setNotifications((prev) => [newNotification, ...prev.slice(0, 4)])
    }
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        const newNotification = {
          id: Date.now(),
          message: "Browser notifications enabled!",
          time: new Date().toLocaleTimeString(),
          type: "success",
        }
        setNotifications((prev) => [newNotification, ...prev.slice(0, 4)])
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-emerald-600" />
          <span>Smart Reminders</span>
        </CardTitle>
        <CardDescription>Stay on track with personalized reminders and notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Reminder Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Daily Reminders</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about your daily learning tasks</p>
            </div>
            <Switch checked={remindersEnabled} onCheckedChange={setRemindersEnabled} />
          </div>

          {remindersEnabled && (
            <div className="space-y-4 pl-4 border-l-2 border-emerald-200 dark:border-emerald-700">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reminder Time</label>
                <Input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-32"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email for Reminders (optional)
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button onClick={saveReminderSettings} size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={requestNotificationPermission} className="w-full">
                <Smartphone className="h-4 w-4 mr-2" />
                Enable Browser Notifications
              </Button>
            </div>
          )}
        </div>

        {/* Recent Notifications */}
        {notifications.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Recent Notifications
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {notification.type === "success" ? (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Bell className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reminder Types */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-4">
          <h4 className="font-medium mb-3">Available Reminder Types</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                <Bell className="h-3 w-3 mr-1" />
                Daily Tasks
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                <Mail className="h-3 w-3 mr-1" />
                Weekly Progress
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-purple-600 border-purple-600">
                <Clock className="h-3 w-3 mr-1" />
                Deadline Alerts
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                <Smartphone className="h-3 w-3 mr-1" />
                Push Notifications
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
