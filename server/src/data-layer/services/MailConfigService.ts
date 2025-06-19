import { getFirestore } from "firebase-admin/firestore"
import { EmailTemplate, MailConfig } from "../models/mailConfig"

const MAIL_CONFIG_COLLECTION = "mail_config"
const EMAIL_TEMPLATES_COLLECTION = "email_templates"

/**
 * Service for managing mail configuration settings in Firebase
 */
export default class MailConfigService {
  private firestore = getFirestore()

  /**
   * Get the current mail configuration
   * @returns The current mail configuration or undefined if not set
   */
  public async getMailConfig(): Promise<MailConfig | undefined> {
    try {
      const snapshot = await this.firestore
        .collection(MAIL_CONFIG_COLLECTION)
        .doc("current")
        .get()

      if (!snapshot.exists) {
        return undefined
      }

      return snapshot.data() as MailConfig
    } catch (error) {
      console.error("Error getting mail config:", error)
      throw error
    }
  }

  /**
   * Update the mail configuration
   * @param config The new mail configuration
   * @returns A promise that resolves when the update is complete
   */
  public async updateMailConfig(config: MailConfig): Promise<void> {
    try {
      await this.firestore
        .collection(MAIL_CONFIG_COLLECTION)
        .doc("current")
        .set(config, { merge: true })
    } catch (error) {
      console.error("Error updating mail config:", error)
      throw error
    }
  }

  /**
   * Get all email templates
   * @returns An array of email templates
   */
  public async getAllEmailTemplates(): Promise<EmailTemplate[]> {
    try {
      const snapshot = await this.firestore
        .collection(EMAIL_TEMPLATES_COLLECTION)
        .get()

      return snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<EmailTemplate, "id">
        return {
          id: doc.id,
          ...data
        }
      })
    } catch (error) {
      console.error("Error getting email templates:", error)
      throw error
    }
  }

  /**
   * Get a specific email template by ID
   * @param id The template ID
   * @returns The email template or undefined if not found
   */
  public async getEmailTemplate(
    id: string
  ): Promise<EmailTemplate | undefined> {
    try {
      const snapshot = await this.firestore
        .collection(EMAIL_TEMPLATES_COLLECTION)
        .doc(id)
        .get()

      if (!snapshot.exists) {
        return undefined
      }

      const data = snapshot.data() as Omit<EmailTemplate, "id">
      return {
        id: snapshot.id,
        ...data
      }
    } catch (error) {
      console.error(`Error getting email template ${id}:`, error)
      throw error
    }
  }

  /**
   * Update or create an email template
   * @param template The email template to update or create
   * @returns A promise that resolves when the update is complete
   */
  public async updateEmailTemplate(template: EmailTemplate): Promise<void> {
    try {
      const { id, ...data } = template
      await this.firestore
        .collection(EMAIL_TEMPLATES_COLLECTION)
        .doc(id)
        .set(
          {
            ...data,
            updatedAt: new Date()
          },
          { merge: true }
        )
    } catch (error) {
      console.error(`Error updating email template ${template.id}:`, error)
      throw error
    }
  }
}
