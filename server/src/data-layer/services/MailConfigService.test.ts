import { cleanFirestore } from "../../test-config/TestUtils"
import MailConfigService from "./MailConfigService"
import { EmailTemplate, MailConfig } from "../models/MailConfig"

import db from "../adapters/FirestoreCollections"
import { EncryptionService } from "../../business-layer/services/EncryptionService"

// Set environment variable for testing
process.env.MAIL_ENCRYPTION_KEY = "test_encryption_key_for_unit_tests"

describe("MailConfigService integration tests", () => {
  const mailConfigService = new MailConfigService(
    new EncryptionService(process.env.MAIL_ENCRYPTION_KEY)
  )

  afterEach(async () => {
    await cleanFirestore()
  })

  describe("Mail config operations", () => {
    it("should return undefined when mail config doesn't exist", async () => {
      const result = await mailConfigService.getMailConfig()
      expect(result).toBeUndefined()
    })

    it("should create and retrieve mail config with encrypted password", async () => {
      const config: MailConfig = {
        email: "test@example.com",
        password: "test-password",
        fromHeader: "Test UASC"
      }

      await mailConfigService.updateMailConfig(config)

      // Get raw document from Firestore to verify password is encrypted
      const doc = await db.mailConfig.doc("current").get()
      const rawData = doc.data() as MailConfig

      // Verify the stored password is encrypted
      expect(rawData.password).not.toEqual("test-password")
      expect(rawData.password).toContain(":") // Our encryption format uses IV:encryptedData

      // Now verify that the service decrypts it properly when retrieving
      const result = await mailConfigService.getMailConfig()

      expect(result).toEqual(config)
    })

    it("should update existing mail config maintaining password encryption", async () => {
      // Initial config
      await mailConfigService.updateMailConfig({
        email: "initial@example.com",
        password: "initial-password",
        fromHeader: "Initial Header"
      })

      // Update with new values
      const updatedConfig: MailConfig = {
        email: "updated@example.com",
        password: "updated-password",
        fromHeader: "Updated Header"
      }

      await mailConfigService.updateMailConfig(updatedConfig)

      // Get raw document to check encryption
      const doc = await db.mailConfig.doc("current").get()
      const rawData = doc.data() as MailConfig

      // Verify encryption
      expect(rawData.password).not.toEqual("updated-password")

      // Verify decryption works
      const result = await mailConfigService.getMailConfig()
      expect(result).toEqual(updatedConfig)
    })

    it("should partially update mail config without affecting password", async () => {
      // Initial config
      const initialConfig: MailConfig = {
        email: "initial@example.com",
        password: "initial-password",
        fromHeader: "Initial Header"
      }

      await mailConfigService.updateMailConfig(initialConfig)

      // Partial update without password
      await mailConfigService.updateMailConfig({
        email: "updated@example.com"
      })

      const result = await mailConfigService.getMailConfig()

      expect(result).toEqual({
        email: "updated@example.com",
        password: "initial-password",
        fromHeader: "Initial Header"
      })
    })

    it("should handle updating only the password", async () => {
      // Initial config
      await mailConfigService.updateMailConfig({
        email: "test@example.com",
        password: "initial-password"
      })

      // Update only password
      await mailConfigService.updateMailConfig({
        password: "new-password"
      })

      const result = await mailConfigService.getMailConfig()
      expect(result?.password).toEqual("new-password")
      expect(result?.email).toEqual("test@example.com")
    })
  })

  describe("Email template operations", () => {
    const template: EmailTemplate = {
      id: "booking_confirmation",
      name: "Booking Confirmation",
      content: "p Hello #{name}, your booking is confirmed",
      description: "Test template",
      updatedAt: new Date()
    }

    it("should return empty array when no templates exist", async () => {
      const templates = await mailConfigService.getAllEmailTemplates()
      expect(templates).toEqual([])
    })

    it("should create and retrieve an email template", async () => {
      await mailConfigService.updateEmailTemplate(template)

      const result = await mailConfigService.getEmailTemplate(template.id)

      // Compare properties individually since dates might not match exactly
      expect(result?.id).toEqual(template.id)
      expect(result?.name).toEqual(template.name)
      expect(result?.content).toEqual(template.content)
      expect(result?.description).toEqual(template.description)
      expect(result?.updatedAt).toBeDefined()
    })

    it("should retrieve all email templates", async () => {
      const template1 = { ...template, id: "template1" }
      const template2 = {
        ...template,
        id: "template2",
        name: "Second Template"
      }

      await mailConfigService.updateEmailTemplate(template1)
      await mailConfigService.updateEmailTemplate(template2)

      const templates = await mailConfigService.getAllEmailTemplates()

      expect(templates).toHaveLength(2)
      expect(templates.some((t) => t.id === "template1")).toBeTruthy()
      expect(templates.some((t) => t.id === "template2")).toBeTruthy()
    })

    it("should return undefined when requested template doesn't exist", async () => {
      const result = await mailConfigService.getEmailTemplate(
        "non_existent_template"
      )
      expect(result).toBeUndefined()
    })

    it("should update an existing template", async () => {
      // Create initial template
      await mailConfigService.updateEmailTemplate(template)

      // Update template
      const updatedTemplate = {
        ...template,
        name: "Updated Name",
        content: "p Updated content with #{name}"
      }

      await mailConfigService.updateEmailTemplate(updatedTemplate)

      const result = await mailConfigService.getEmailTemplate(template.id)

      expect(result?.name).toEqual("Updated Name")
      expect(result?.content).toEqual("p Updated content with #{name}")
    })
  })
})
