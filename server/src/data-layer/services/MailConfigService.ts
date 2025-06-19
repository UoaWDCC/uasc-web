import { EmailTemplate, MailConfig } from "../models/MailConfig"
import db from "../adapters/FirestoreCollections"
import * as crypto from "crypto"

/**
 * Service for managing mail configuration settings in Firebase
 */
export default class MailConfigService {
  private firestore = db
  private readonly encryptionKey: string
  private readonly encryptionAlgorithm = "aes-256-cbc"

  constructor() {
    // Use environment variable for encryption key in production
    // or generate a secure key if not available (development/testing)
    this.encryptionKey =
      process.env.MAIL_ENCRYPTION_KEY ||
      "uasc_default_dev_key_not_for_production_use"

    if (
      process.env.NODE_ENV === "production" &&
      !process.env.MAIL_ENCRYPTION_KEY
    ) {
      console.warn(
        "WARNING: Using default encryption key in production! Set MAIL_ENCRYPTION_KEY environment variable."
      )
    }
  }

  /**
   * Encrypt sensitive data
   * @param text The text to encrypt
   * @returns The encrypted text as base64 string
   */
  private encrypt(text: string): string {
    try {
      // Generate a random initialization vector
      const iv = crypto.randomBytes(16)
      // Create a key buffer from the encryption key
      const key = crypto
        .createHash("sha256")
        .update(this.encryptionKey)
        .digest()
        .subarray(0, 32)
      // Create cipher
      const cipher = crypto.createCipheriv(this.encryptionAlgorithm, key, iv)
      // Encrypt the text
      let encrypted = cipher.update(text, "utf8", "base64")
      encrypted += cipher.final("base64")
      // Prepend the IV to the encrypted data (we'll need it for decryption)
      return iv.toString("hex") + ":" + encrypted
    } catch (error) {
      console.error("Encryption error:", error)
      throw new Error("Failed to encrypt data")
    }
  }

  /**
   * Decrypt sensitive data
   * @param encryptedText The encrypted text to decrypt
   * @returns The decrypted text
   */
  private decrypt(encryptedText: string): string {
    try {
      // Split the IV and encrypted data
      const [ivHex, encrypted] = encryptedText.split(":")
      // Convert the IV from hex to Buffer
      const iv = Buffer.from(ivHex, "hex")
      // Create a key buffer from the encryption key
      const key = crypto
        .createHash("sha256")
        .update(this.encryptionKey)
        .digest()
        .subarray(0, 32)
      // Create decipher
      const decipher = crypto.createDecipheriv(
        this.encryptionAlgorithm,
        key,
        iv
      )
      // Decrypt the data
      let decrypted = decipher.update(encrypted, "base64", "utf8")
      decrypted += decipher.final("utf8")
      return decrypted
    } catch (error) {
      console.error("Decryption error:", error)
      throw new Error("Failed to decrypt data")
    }
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
        config.password = this.decrypt(config.password)
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
        configToSave.password = this.encrypt(configToSave.password)
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
