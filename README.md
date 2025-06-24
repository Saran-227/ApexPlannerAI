# ApexPlannerAI 🧠📆  
*OmniDimension-Inspired AI Task Planner & Calendar Assistant*

## 🔍 Overview
**ApexPlannerAI** is a smart, AI-powered planning assistant that transforms **natural language inputs** into **real-world task automation** and **calendar scheduling**. This project aligns with the **OmniDimension hackathon problem statement**, where users describe tasks like:

> “Book a dentist tomorrow at 5 PM and add it to my calendar”

The system then:
- Parses the task using **Google Gemini AI**
- Breaks it into subtasks (e.g., search, book, schedule)
- Simulates external actions (e.g., mock booking)
- Adds relevant entries to the calendar
- Provides step-by-step execution updates — all automatically

## 💡 Problem Statement Inspiration (Omni)
This project is built around OmniDimension’s challenge:
> “Build a multi-agent system that understands and executes user-described tasks end-to-end with no manual steps.”

ApexPlannerAI brings this to life by integrating goal planning, scheduling, and simulated task execution into a unified interface.

---

## ✨ Features
- 🧠 **Gemini-Powered Task Understanding**  
  Uses Google Gemini API to extract intent, action steps, time, and type of task (goal-based or action-based).
  
- 📅 **Smart Calendar Roadmaps**  
  Automatically generates study or goal-based schedules when input is like: “Learn Python in 30 days”.

- 🔁 **Real-Time Task Breakdown & Status Updates**  
  Displays step-by-step execution of AI-decided actions (e.g., “Searching dentist…”, “Booking slot…”, “Added to calendar!”).

- 🎯 **Multi-Agent Inspired Logic**  
  Inspired by OmniDimension’s multi-agent system idea — every action is broken into autonomous, agent-like steps.

- 💬 **One-Input Simplicity**  
  A single input box controls everything — no form-filling, no clicking through options.

---

## 🚀 How It Works
1. User types: `Remind me to drink water every 2 hours`
2. Gemini API processes the input and returns:
   - Intent: `create_reminder`
   - Repeat: `true`
   - Output: `Reminder set!`
3. Task is visualized and added to the planner/calendar.

---

## 🛠️ Tech Stack
- **Frontend**: HTML, Tailwind CSS, JavaScript
- **AI**: [Gemini Pro API (Google AI)](https://ai.google.dev/)
- **Deployment**: Vercel  
- **Calendar Engine**: Custom in-browser schedule generator
