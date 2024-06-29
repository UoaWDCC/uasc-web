/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Firebase API key */
  readonly VITE_FIREBASE_API_KEY: string
  /** Firebase Auth domain */
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  /** Firebase Project ID */
  readonly VITE_FIREBASE_PROJECT_ID: string
  /** Firebase Storage Bucket */
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  /** Firebase Messaging Sender ID */
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  /** Firebase App ID */
  readonly VITE_FIREBASE_APP_ID: string
  /** Backend Base URL */
  readonly VITE_BACKEND_BASE_URL: string
  /** Stripe Publishable Key */
  readonly VITE_ENV_STRIPE_PUBLISHABLE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
