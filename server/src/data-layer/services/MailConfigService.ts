import type { EmailTemplate, MailConfig } from "../models/MailConfig"
import db from "../adapters/FirestoreCollections"
import type { EncryptionService } from "../../business-layer/services/EncryptionService"

/**
 * Service for managing mail configuration settings in Firebase
 */
export default class MailConfigService {
  private firestore = db
  private readonly encryptionService: EncryptionService

  constructor(encryptionService: EncryptionService) {
    this.encryptionService = encryptionService
  }

  /**
   * Get the current mail configuration
   * @returns The current mail configuration or undefined if not set
   */
  public async getMailConfig(): Promise<MailConfig | undefined> {
    try {
      const snapshot = await this.firestore.mailConfig.doc("current").get()

      if (!snapshot.exists) {
        return undefined
      }

      const config = snapshot.data() as MailConfig

      // Decrypt password if it exists
      if (config.password) {
        config.password = this.encryptionService.decrypt(config.password)
      }

      return config
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
      const configToSave = { ...config }

      // Encrypt password if present
      if (configToSave.password) {
        configToSave.password = this.encryptionService.encrypt(
          configToSave.password
        )
      }

      await this.firestore.mailConfig
        .doc("current")
        .set(configToSave, { merge: true })
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
      const snapshot = await this.firestore.emailTemplates.get()

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
      const snapshot = await this.firestore.emailTemplates.doc(id).get()

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
      await this.firestore.emailTemplates.doc(id).set(
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
