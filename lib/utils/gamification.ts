/**
 * Gamification utilities for calculating achievements and points
 */

export interface GamificationMetrics {
  points: number
  level: string
  nextLevelProgress: number
  achievements: string[]
}

export function calculateLevel(points: number): string {
  if (points < 100) return "Novice"
  if (points < 500) return "Apprentice"
  if (points < 1000) return "Intermediate"
  if (points < 2000) return "Advanced"
  if (points < 5000) return "Expert"
  return "Master"
}

export function calculateNextLevelProgress(points: number): number {
  const levels = [0, 100, 500, 1000, 2000, 5000, 10000]
  for (let i = 0; i < levels.length - 1; i++) {
    if (points >= levels[i] && points < levels[i + 1]) {
      const currentLevelPoints = levels[i]
      const nextLevelPoints = levels[i + 1]
      return Math.round(((points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100)
    }
  }
  return 100
}

export function checkNewAchievements(
  lessonsCompleted: number,
  challengesSolved: number,
  streak: number,
  points: number,
): string[] {
  const achievements: string[] = []

  if (lessonsCompleted >= 1) achievements.push("first_lesson")
  if (lessonsCompleted >= 10) achievements.push("10_lessons")
  if (lessonsCompleted >= 50) achievements.push("50_lessons")
  if (lessonsCompleted >= 100) achievements.push("100_lessons")
  if (challengesSolved >= 1) achievements.push("first_challenge")
  if (challengesSolved >= 10) achievements.push("challenge_solver")
  if (streak >= 7) achievements.push("7_day_streak")
  if (streak >= 30) achievements.push("30_day_streak")
  if (points >= 5000) achievements.push("5000_points")

  return achievements
}

export function calculatePointsForLesson(difficulty: "beginner" | "intermediate" | "advanced"): number {
  const points = {
    beginner: 10,
    intermediate: 25,
    advanced: 50,
  }
  return points[difficulty]
}
