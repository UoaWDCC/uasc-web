import { MailConfig } from "../../data-layer/models/MailConfig"

export interface UpdateMailConfigRequestBody {
  /**
   * The updated mail configuration settings
   */
  config: Partial<MailConfig>
}

export interface UpdateEmailTemplateRequestBody {
  /**
   * The template ID
   * @example "booking_confirmation"
   */
  id: string

  /**
   * The template name
   * @example "Booking Confirmation"
   */
  name: string

  /**
   * The template content in Pug format
   */
  content: string

  /**
   * An optional description of the template's purpose
   */
  description?: string
}
