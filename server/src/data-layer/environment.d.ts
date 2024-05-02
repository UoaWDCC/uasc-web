declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/**
			 * The Firebase API key.
			 */
			API_KEY: string;
			/**
			 * The Stripe API key to use for sending requests to Stripe.
			 * 
			 * See https://github.com/UoaWDCC/uasc-web/wiki/Testing-and-Mocking#stripe-webhook-testing
			 * for how to obtain one for local testing.
			 */
			STRIPE_API_KEY: string;
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
			STRIPE_WEBHOOK_SECRET: string;
		}
	}
}

export {}