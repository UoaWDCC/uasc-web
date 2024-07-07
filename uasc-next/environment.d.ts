declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** Firebase API key */
      readonly NEXT_PUBLIC_FIREBASE_API_KEY: string
      /** Firebase Auth domain */
      readonly NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string
      /** Firebase Project ID */
      readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID: string
      /** Firebase Storage Bucket */
      readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string
      /** Firebase Messaging Sender ID */
      readonly NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string
      /** Firebase App ID */
      readonly NEXT_PUBLIC_FIREBASE_APP_ID: string
      /** For analytics */
      readonly NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string
      /** Backend Base URL */
      readonly NEXT_PUBLIC_BACKEND_BASE_URL: string
      /** Stripe Publishable Key */
      readonly NEXT_PUBLIC_ENV_STRIPE_PUBLISHABLE_KEY: string
    }
  }
}

export {}