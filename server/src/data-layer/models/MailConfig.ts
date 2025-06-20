/**
 * Interface for mail configuration settings that can be stored in Firebase
 */
export interface MailConfig {
  /**
   * Email address used for sending emails
   */
  email?: string

  /**
   * App password for the email service
   * @sensitive This should be encrypted or secured when stored
   */
  password?: string

  /**
   * From header for sent emails
   * @default "UASC Bookings"
   */
  fromHeader?: string
}

/**
 * Interface for email template configuration
 */
export interface EmailTemplate {
  /**
   * The template ID
   * @example "booking_confirmation"
   */
  id: string

  /**
   * The template content in Pug format
   */
  content: string

  /**
   * Last updated timestamp
   */
  updatedAt: Date

  /**
   * The name of the template
   * @example "Booking Confirmation"
   */
  name: string

  /**
   * A description of the template's purpose
   */
  description?: string
}
