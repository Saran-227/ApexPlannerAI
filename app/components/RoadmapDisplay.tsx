"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Calendar, Clock, Target } from "lucide-react"

interface RoadmapDisplayProps {
  plan: any
}

export default function RoadmapDisplay({ plan }: RoadmapDisplayProps) {
  if (!plan) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-gray-400" />
            <span>Your Roadmap</span>
          </CardTitle>
          <CardDescription>
            Your personalized learning roadmap will appear here after you generate a plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter your goal to see your AI-generated roadmap</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const completedWeeks = 0 // This would be calculated based on actual progress
  const progressPercentage = (completedWeeks / plan.weeks.length) * 100

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-emerald-600" />
          <span>Your Roadmap</span>
        </CardTitle>
        <CardDescription>
          AI-generated plan for: <strong>{plan.goal}</strong>
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="text-emerald-600 border-emerald-600">
            <Clock className="h-3 w-3 mr-1" />
            {plan.duration}
          </Badge>
          <Badge variant="outline" className="text-emerald-600 border-emerald-600">
            <Calendar className="h-3 w-3 mr-1" />
            {plan.dailyTime}/day
          </Badge>
          <Badge variant="outline" className="text-emerald-600 border-emerald-600">
            {plan.mode} Mode
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress Overview */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-500">
                {completedWeeks}/{plan.weeks.length} weeks
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Weekly Breakdown */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {plan.weeks.map((week: any, index: number) => (
              <div
                key={week.week}
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  index === 0
                    ? "border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-700"
                    : "border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {index === 0 ? (
                      <Circle className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Week {week.week}: {week.title}
                      </h4>
                      {index === 0 && (
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                          Current
                        </Badge>
                      )}
                    </div>
                    <ul className="space-y-1">
                      {week.topics.map((topic: string, topicIndex: number) => (
                        <li key={topicIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 flex-shrink-0"></span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
