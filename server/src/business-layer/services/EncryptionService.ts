import * as crypto from "crypto"

export class EncryptionService {
  private readonly encryptionAlgorithm = "aes-256-cbc"
  private readonly encryptionKey: string

  constructor(encryptionKey?: string) {
    // Use environment variable for encryption key in production
    // or generate a secure key if not available (development/testing)
    this.encryptionKey =
      encryptionKey || "uasc_default_dev_key_not_for_production_use"

    if (process.env.NODE_ENV === "production" && !encryptionKey) {
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
  public encrypt(text: string): string {
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
  public decrypt(encryptedText: string): string {
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
}
