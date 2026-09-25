# FitLog — Workout Library

FitLog is a responsive workout library web application built with Next.js. Users can browse workouts, view detailed workout information, add exercises to today's plan, save workouts for later, and manage their workout plan easily.

## Live Website

[Live Demo](YOUR_LIVE_LINK_HERE)

## GitHub Repository

[GitHub Repository](https://github.com/atiajahan/Fitlog-workout-project)

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Icons / Lucide React
- React Hot Toast
- LocalStorage
- Next.js App Router

## Features

- Browse a workout library with responsive workout cards
- View detailed information for each workout
- Add workouts to Today's Plan
- Save workouts for later
- Remove workouts from the plan or saved list
- Mark workouts as completed
- View workout statistics including exercises, minutes, and calories
- Sort workouts by duration, calories, and rating
- Data persists using browser LocalStorage
- Fully responsive design for mobile, tablet, and desktop
- Toast notifications for workout actions
- Dynamic workout details pages

## Project Structure

```text
src/
├── app/
│   ├── my-plan/
│   │   └── page.tsx
│   ├── workouts/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── WorkoutLibrary.tsx
│   ├── WorkoutCard.tsx
│   ├── WorkoutDetails.tsx
│   ├── PlanMetrics.tsx
│   ├── PlanWorkoutCard.tsx
│   └── Footer.tsx
│
├── context/
│   └── FitLogContext.tsx
│
└── types/
    └── workout.ts
Getting Started

First, install the dependencies:

npm install

Then, run the development server:

npm run dev

Open http://localhost:3000 in your browser.

Build for Production
npm run build

To start the production server:

npm start
Main Pages
Home / Workout Library

Users can browse all available workouts and sort them by duration, calories, or rating.

Workout Details

Each workout has its own dynamic details page containing:

Workout image
Description
Muscle groups
Equipment
Difficulty
Sets and reps
Duration
Calories
Rating
Instructions
My Plan

Users can manage:

Today's Plan
Saved Workouts
Exercise count
Total minutes
Total calories
Workout sorting
Mark as Done
Remove workouts
Author

Atia Jahan


