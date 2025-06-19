import { cleanFirestore } from "../../test-config/TestUtils"
import MailConfigService from "./MailConfigService"
import { EmailTemplate, MailConfig } from "../models/MailConfig"

describe("MailConfigService integration tests", () => {
  const mailConfigService = new MailConfigService()

  afterEach(async () => {
    await cleanFirestore()
  })

  describe("Mail config operations", () => {
    it("should return undefined when mail config doesn't exist", async () => {
      const result = await mailConfigService.getMailConfig()
      expect(result).toBeUndefined()
    })

    it("should create and retrieve mail config", async () => {
      const config: MailConfig = {
        email: "test@example.com",
        password: "test-password",
        fromHeader: "Test UASC"
      }

      await mailConfigService.updateMailConfig(config)

      const result = await mailConfigService.getMailConfig()

      expect(result).toEqual(config)
    })

    it("should update existing mail config", async () => {
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

      const result = await mailConfigService.getMailConfig()

      expect(result).toEqual(updatedConfig)
    })

    it("should partially update mail config", async () => {
      // Initial config
      const initialConfig: MailConfig = {
        email: "initial@example.com",
        password: "initial-password",
        fromHeader: "Initial Header"
      }

      await mailConfigService.updateMailConfig(initialConfig)

      // Partial update
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

    it("should update the timestamp when updating a template", async () => {
      // Create initial template with fixed date
      const initialDate = new Date("2023-01-01")
      await mailConfigService.updateEmailTemplate({
        ...template,
        updatedAt: initialDate
      })

      // Get the initial saved template
      const initialTemplate = await mailConfigService.getEmailTemplate(
        template.id
      )

      // Update template and verify timestamp changes
      await new Promise((resolve) => setTimeout(resolve, 10)) // Small delay to ensure timestamp difference
      await mailConfigService.updateEmailTemplate({
        ...template,
        name: "New Name"
      })

      const updatedTemplate = await mailConfigService.getEmailTemplate(
        template.id
      )

      expect(updatedTemplate?.updatedAt.getTime()).toBeGreaterThan(
        initialTemplate?.updatedAt.getTime() as number
      )
    })
  })
})
