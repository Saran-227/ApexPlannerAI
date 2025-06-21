"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Key, Eye, EyeOff, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

export default function APIKeyManager() {
  const [apiKey, setApiKey] = useState("")
  const [showKey, setShowKey] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [validationStatus, setValidationStatus] = useState<"idle" | "valid" | "invalid">("idle")

  useEffect(() => {
    // Load saved API key
    const savedKey = localStorage.getItem("gemini-api-key")
    if (savedKey) {
      setApiKey(savedKey)
      setValidationStatus("valid") // Assume valid if saved
    }
  }, [])

  const validateAPIKey = async () => {
    if (!apiKey.trim()) {
      setValidationStatus("invalid")
      return
    }

    setIsValidating(true)
    setValidationStatus("idle")

    try {
      // Test the API key with a simple request
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "Hello, this is a test. Please respond with 'API key is working'.",
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 10,
            },
          }),
        },
      )

      if (response.ok) {
        localStorage.setItem("gemini-api-key", apiKey)
        setValidationStatus("valid")
      } else {
        setValidationStatus("invalid")
      }
    } catch (error) {
      console.error("API key validation error:", error)
      setValidationStatus("invalid")
    } finally {
      setIsValidating(false)
    }
  }

  const removeAPIKey = () => {
    setApiKey("")
    localStorage.removeItem("gemini-api-key")
    setValidationStatus("idle")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Key className="h-5 w-5 text-emerald-600" />
          <span>AI Configuration</span>
        </CardTitle>
        <CardDescription>Configure your Gemini API key for AI-powered roadmap generation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* API Key Input */}
        <div>
          <label htmlFor="gemini-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gemini API Key
          </label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                id="gemini-key"
                type={showKey ? "text" : "password"}
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <Button onClick={validateAPIKey} disabled={isValidating || !apiKey.trim()}>
              {isValidating ? "Validating..." : "Validate"}
            </Button>
          </div>
        </div>

        {/* Validation Status */}
        {validationStatus === "valid" && (
          <Alert className="border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <AlertDescription className="text-emerald-600 dark:text-emerald-400">
              API key is valid and ready to use!
            </AlertDescription>
          </Alert>
        )}

        {validationStatus === "invalid" && (
          <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600 dark:text-red-400">
              Invalid API key. Please check your key and try again.
            </AlertDescription>
          </Alert>
        )}

        {/* Instructions */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium mb-2">How to get your Gemini API key:</h4>
          <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-decimal list-inside">
            <li>
              Visit{" "}
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline inline-flex items-center"
              >
                Google AI Studio <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </li>
            <li>Sign in with your Google account</li>
            <li>Click "Create API Key"</li>
            <li>Copy the generated key and paste it above</li>
          </ol>
        </div>

        {/* API Key Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Status:</span>
            <Badge
              variant={validationStatus === "valid" ? "default" : "outline"}
              className={validationStatus === "valid" ? "bg-emerald-600" : ""}
            >
              {validationStatus === "valid" ? "Connected" : "Not Connected"}
            </Badge>
          </div>
          {validationStatus === "valid" && (
            <Button variant="outline" size="sm" onClick={removeAPIKey}>
              Remove Key
            </Button>
          )}
        </div>

        {/* Usage Information */}
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>• Your API key is stored locally in your browser</p>
          <p>• Gemini API offers generous free tier limits</p>
          <p>• Your key is only used for generating learning roadmaps</p>
        </div>
      </CardContent>
    </Card>
  )
}
