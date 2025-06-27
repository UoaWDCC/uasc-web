import type {
  EmailTemplate,
  MailConfig
} from "../../data-layer/models/MailConfig"
import type { CommonResponse } from "./CommonResponse"

export interface GetMailConfigResponse extends CommonResponse {
  /**
   * The current mail configuration or undefined if not found
   */
  config?: MailConfig
}

export interface UpdateMailConfigResponse extends CommonResponse {}

export interface GetEmailTemplateResponse extends CommonResponse {
  /**
   * The email template or undefined if not found
   */
  template?: EmailTemplate
}

export interface GetAllEmailTemplatesResponse extends CommonResponse {
  /**
   * The list of available email templates
   */
  templates: EmailTemplate[]
}

export interface UpdateEmailTemplateResponse extends CommonResponse {}
