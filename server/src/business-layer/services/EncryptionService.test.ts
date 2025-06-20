import { EncryptionService } from "./EncryptionService"

describe("EncryptionService", () => {
  let encryptionService: EncryptionService
  const testEncryptionKey = "test-encryption-key-for-unit-tests"

  beforeEach(() => {
    encryptionService = new EncryptionService(testEncryptionKey)
  })

  describe("encrypt", () => {
    it("should encrypt a string", () => {
      const plainText = "sensitive data"
      const encrypted = encryptionService.encrypt(plainText)

      // Verify the result is a string
      expect(typeof encrypted).toBe("string")

      // Verify the result is not the original plaintext
      expect(encrypted).not.toBe(plainText)

      // Verify the result contains the IV separator ':'
      expect(encrypted).toContain(":")

      // Verify the IV part is 32 characters (16 bytes as hex)
      const [ivHex] = encrypted.split(":")
      expect(ivHex.length).toBe(32)
    })

    it("should produce different outputs for the same input due to random IV", () => {
      const plainText = "sensitive data"
      const encrypted1 = encryptionService.encrypt(plainText)
      const encrypted2 = encryptionService.encrypt(plainText)

      expect(encrypted1).not.toBe(encrypted2)
    })

    describe("decrypt", () => {
      it("should decrypt an encrypted string back to the original value", () => {
        const originalText = "sensitive data to encrypt and decrypt"
        const encrypted = encryptionService.encrypt(originalText)
        const decrypted = encryptionService.decrypt(encrypted)

        expect(decrypted).toBe(originalText)
      })

      it("should throw an error for invalid encrypted text format", () => {
        expect(() =>
          encryptionService.decrypt("invalid-encrypted-text")
        ).toThrow("Failed to decrypt data")
      })

      it("should throw an error when wrong encryption key is used", () => {
        // Encrypt with one key
        const encrypted = encryptionService.encrypt("test")

        // Try to decrypt with a different key
        const wrongKeyService = new EncryptionService("different-key")

        expect(() => wrongKeyService.decrypt(encrypted)).toThrow(
          "Failed to decrypt data"
        )
      })
    })

    describe("end-to-end encryption/decryption", () => {
      it("should handle empty strings", () => {
        const emptyText = ""
        const encrypted = encryptionService.encrypt(emptyText)
        const decrypted = encryptionService.decrypt(encrypted)

        expect(decrypted).toBe(emptyText)
      })

      it("should handle special characters", () => {
        const specialChars = "áéíóú ñ !@#$%^&*()_+-=[]{}|;:'\",.<>/?`~"
        const encrypted = encryptionService.encrypt(specialChars)
        const decrypted = encryptionService.decrypt(encrypted)

        expect(decrypted).toBe(specialChars)
      })

      it("should handle long texts", () => {
        const longText = "a".repeat(10000)
        const encrypted = encryptionService.encrypt(longText)
        const decrypted = encryptionService.decrypt(encrypted)

        expect(decrypted).toBe(longText)
      })
    })
  })
})
