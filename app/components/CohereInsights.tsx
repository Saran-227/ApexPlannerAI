"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Clock, Target, Zap, BookOpen } from "lucide-react"

interface CohereInsightsProps {
  plan: any
}

export default function CohereInsights({ plan }: CohereInsightsProps) {
  if (!plan) return null

  // Calculate insights based on the plan
  const totalWeeks = plan.weeks?.length || 0
  const totalTasks = plan.dailySchedule?.length || 0
  const avgTasksPerWeek = Math.round(totalTasks / totalWeeks) || 0
  const estimatedHours = totalTasks * (Number.parseInt(plan.dailyTime) || 1)

  const insights = [
    {
      icon: Clock,
      title: "Time Investment",
      value: `${estimatedHours} hours`,
      description: "Total estimated learning time",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Target,
      title: "Learning Intensity",
      value: `${avgTasksPerWeek} tasks/week`,
      description: "Average tasks per week",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      icon: TrendingUp,
      title: "Difficulty Curve",
      value: "Progressive",
      description: "Gradually increasing complexity",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: BookOpen,
      title: "Learning Style",
      value: plan.mode,
      description: `Optimized for ${plan.mode.toLowerCase()}`,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-blue-600" />
          <span>Cohere AI Insights</span>
        </CardTitle>
        <CardDescription>Smart analysis of your learning plan powered by Cohere</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className={`${insight.bgColor} rounded-lg p-4`}>
              <div className="flex items-center space-x-2 mb-2">
                <insight.icon className={`h-5 w-5 ${insight.color}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{insight.title}</span>
              </div>
              <div className="space-y-1">
                <p className={`text-lg font-bold ${insight.color}`}>{insight.value}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cohere AI Recommendations */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
            <Brain className="h-4 w-4 mr-2 text-blue-600" />
            Cohere AI Recommendations
          </h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                Optimal
              </Badge>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Your {plan.dailyTime} daily commitment is well-balanced for {plan.mode.toLowerCase()} goals
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                Tip
              </Badge>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {plan.experience === "Beginner"
                  ? "Start with fundamentals and build confidence gradually"
                  : "Leverage your existing knowledge to accelerate learning"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-purple-600 border-purple-600">
                Boost
              </Badge>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Consider joining communities focused on {plan.goal.split(" ")[0].toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Cohere Model Info */}
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Powered by Cohere Command</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Advanced language model optimized for structured content generation and educational planning
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
