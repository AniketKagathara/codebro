// Error handling utility for the application
export class AppError extends Error {
  constructor(
    public message: string,
    public code = "UNKNOWN_ERROR",
    public statusCode = 500,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export const ErrorCodes = {
  UNAUTHORIZED: { code: "UNAUTHORIZED", statusCode: 401, message: "Please sign in to continue" },
  FORBIDDEN: { code: "FORBIDDEN", statusCode: 403, message: "You don't have permission to access this" },
  NOT_FOUND: { code: "NOT_FOUND", statusCode: 404, message: "The resource you're looking for doesn't exist" },
  VALIDATION_ERROR: { code: "VALIDATION_ERROR", statusCode: 400, message: "Invalid input provided" },
  INTERNAL_ERROR: { code: "INTERNAL_ERROR", statusCode: 500, message: "An unexpected error occurred" },
  DATABASE_ERROR: { code: "DATABASE_ERROR", statusCode: 500, message: "Database operation failed" },
  AUTH_ERROR: { code: "AUTH_ERROR", statusCode: 401, message: "Authentication failed" },
  RATE_LIMITED: { code: "RATE_LIMITED", statusCode: 429, message: "Too many requests, please try again later" },
}

export function handleError(error: any) {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    }
  }

  if (error?.message?.includes("unauthorized")) {
    return {
      message: ErrorCodes.UNAUTHORIZED.message,
      code: ErrorCodes.UNAUTHORIZED.code,
      statusCode: ErrorCodes.UNAUTHORIZED.statusCode,
    }
  }

  return {
    message: ErrorCodes.INTERNAL_ERROR.message,
    code: ErrorCodes.INTERNAL_ERROR.code,
    statusCode: ErrorCodes.INTERNAL_ERROR.statusCode,
  }
}
