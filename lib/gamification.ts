export const POINTS = {
  LESSON_COMPLETED: 10,
  CHALLENGE_SOLVED: 50,
  CERTIFICATE_EARNED: 100,
  STREAK_BONUS: 5,
} as const

export const ACHIEVEMENTS = {
  FIRST_LESSON: "first_lesson",
  TEN_LESSONS: "10_lessons",
  FIFTY_LESSONS: "50_lessons",
  HUNDRED_LESSONS: "100_lessons",
  SEVEN_DAY_STREAK: "7_day_streak",
  THIRTY_DAY_STREAK: "30_day_streak",
  FIVE_THOUSAND_POINTS: "5000_points",
} as const

export function calculatePoints(action: keyof typeof POINTS, multiplier = 1): number {
  return POINTS[action] * multiplier
}

export function calculateStreak(lastActiveDate: Date, currentDate: Date = new Date()): number {
  const diffTime = Math.abs(currentDate.getTime() - lastActiveDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 1 ? 1 : 0
}

export function getLevelFromPoints(points: number): number {
  return Math.floor(points / 1000) + 1
}

export function getNextLevelPoints(currentLevel: number): number {
  return currentLevel * 1000 + 1000
}
