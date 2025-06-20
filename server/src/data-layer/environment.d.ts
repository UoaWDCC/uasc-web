declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * The Firebase API key.
       */
      API_KEY: string
      /**
       * The Stripe API key to use for sending requests to Stripe.
       *
       * See https://github.com/UoaWDCC/uasc-web/wiki/Testing-and-Mocking#stripe-webhook-testing
       * for how to obtain one for local testing.
       */
      STRIPE_API_KEY: string
      /**
       * The Stripe webhook secret that is sent by Stripe servers when a
       * payload is posted to our webhook handler.
       *
       * We can use this webhook secret to validate the JSON payload
       * was indeed sent by Stripe by using this webhook secret
       * as the HMAC signer in a SHA256 hash.
       *
       * See https://github.com/UoaWDCC/uasc-web/wiki/Testing-and-Mocking#stripe-webhook-testing
       * for how to obtain one for local testing.
       */
      STRIPE_WEBHOOK_SECRET: string
      /**
       * The email from which NodeMailer emails should be sent from
       *
       * You will need to have access to this account to obtain the password
       */
      NODE_MAILER_EMAIL: string
      /**
       * The **App Password** for the gmail account specified by `NODE_MAILER_EMAIL`.
       *
       * Refer to https://knowledge.workspace.google.com/kb/how-to-create-app-passwords-000009237
       */
      NODE_MAILER_PASSWORD: string
      /**
       * The URL to show to admins when they need to access the admin member sheet.
       */
      REDIRECT_MEMBERS_GOOGLE_FORM_LINK: string
      /**
       * The SSL certificate to use for HTTPS.
       */
      HTTPS_SERVER_CERTIFICATE: string
      /**
       * The SSL key to use for HTTPS.
       */
      HTTPS_SERVER_KEY: string
    }
  }
}

export {}
