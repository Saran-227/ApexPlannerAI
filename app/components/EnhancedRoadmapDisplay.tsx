"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, Calendar, Clock, Target, Lightbulb, Trophy, Brain, Eye } from "lucide-react"
import { useState } from "react"

interface EnhancedRoadmapDisplayProps {
  plan: any
}

export default function EnhancedRoadmapDisplay({ plan }: EnhancedRoadmapDisplayProps) {
  const [activeTab, setActiveTab] = useState("roadmap")
  const [showRawResponse, setShowRawResponse] = useState(false)

  if (!plan) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-gray-400" />
            <span>Your AI Roadmap</span>
          </CardTitle>
          <CardDescription>
            Your personalized AI-generated learning roadmap will appear here after you generate a plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter your goal to see your Cohere AI-generated roadmap</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const completedWeeks = 0 // This would be calculated based on actual progress
  const progressPercentage = (completedWeeks / plan.weeks.length) * 100

  const tabs = [
    { id: "roadmap", label: "Roadmap", icon: Target },
    { id: "tips", label: "Tips", icon: Lightbulb },
    { id: "milestones", label: "Milestones", icon: Trophy },
    { id: "raw", label: "AI Response", icon: Brain },
  ]

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-emerald-600" />
          <span>Cohere AI Roadmap</span>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">Cohere Powered</Badge>
        </CardTitle>
        <CardDescription>
          Personalized plan for: <strong>{plan.goal}</strong>
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
          {plan.experience && (
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              {plan.experience}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 ${activeTab === tab.id ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

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

          {/* Tab Content */}
          {activeTab === "roadmap" && (
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
                      {week.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{week.description}</p>
                      )}
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
          )}

          {activeTab === "tips" && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {plan.tips && plan.tips.length > 0 ? (
                plan.tips.map((tip: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
                  >
                    <Lightbulb className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{tip}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No tips available for this plan</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "milestones" && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {plan.milestones && plan.milestones.length > 0 ? (
                plan.milestones.map((milestone: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                  >
                    <Trophy className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{milestone}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Trophy className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No milestones defined for this plan</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "raw" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white">Raw Cohere AI Response</h4>
                <Button variant="outline" size="sm" onClick={() => setShowRawResponse(!showRawResponse)}>
                  <Eye className="h-4 w-4 mr-2" />
                  {showRawResponse ? "Hide" : "Show"}
                </Button>
              </div>
              {showRawResponse && plan.rawAIResponse && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {plan.rawAIResponse}
                  </pre>
                </div>
              )}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">About Cohere AI</h5>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  This roadmap was generated using Cohere's advanced language model, which specializes in understanding
                  context and generating structured, helpful content for learning and productivity.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
