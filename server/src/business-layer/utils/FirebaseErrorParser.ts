const firebaseErrorMessages: Record<string, string> = {
  "auth/invalid-email": "Invalid email address.",
  "auth/user-not-found": "User not found. Please check your credentials.",
  "auth/email-already-in-use": "An account already exists for this email."
}

export const parseFirebaseError = (error: any): string => {
  if (error && error.code && firebaseErrorMessages[error.code]) {
    return firebaseErrorMessages[error.code]
  } else {
    return "An unexpected error occurred. Please try again."
  }
}
