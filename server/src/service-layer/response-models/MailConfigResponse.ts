import { MailConfig, EmailTemplate } from "../../data-layer/models/MailConfig"

export interface GetMailConfigResponse {
  /**
   * The current mail configuration or undefined if not found
   */
  config?: MailConfig

  /**
   * Error message if an error occurred
   */
  error?: string
}

export interface UpdateMailConfigResponse {
  /**
   * Whether the update was successful
   */
  success: boolean

  /**
   * Error message if an error occurred
   */
  error?: string
}

export interface GetEmailTemplateResponse {
  /**
   * The email template or undefined if not found
   */
  template?: EmailTemplate

  /**
   * Error message if an error occurred
   */
  error?: string
}

export interface GetAllEmailTemplatesResponse {
  /**
   * The list of available email templates
   */
  templates: EmailTemplate[]

  /**
   * Error message if an error occurred
   */
  error?: string
}

export interface UpdateEmailTemplateResponse {
  /**
   * Whether the update was successful
   */
  success: boolean

  /**
   * Error message if an error occurred
   */
  error?: string
}
