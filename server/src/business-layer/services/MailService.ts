import path from "node:path"
import * as NodeMailer from "nodemailer"
import { compile, compileFile } from "pug"
import MailConfigService from "../../data-layer/services/MailConfigService"
import { EncryptionService } from "./EncryptionService"

const TEMPLATE_BASE_PATH = path.join(__dirname, "..", "templates")

// Default template will be used if no custom one is found
const DEFAULT_BOOKING_CONFIRMATION_TEMPLATE = compileFile(
  `${TEMPLATE_BASE_PATH}/BookingConfirmation.pug`
)

export default class MailService {
  private mailConfigService: MailConfigService
  private transporter: NodeMailer.Transporter | null = null

  constructor() {
    this.mailConfigService = new MailConfigService(
      new EncryptionService(process.env.MAIL_ENCRYPTION_KEY)
    )
  }

  /**
   * Initialize the email transporter with the latest configuration from the database
   */
  private async initializeTransporter() {
    // Get latest mail configuration
    const config = await this.mailConfigService.getMailConfig()

    // Create transporter with hardcoded SMTP settings and configurable auth
    this.transporter = NodeMailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config?.email || process.env.NODE_MAILER_EMAIL,
        pass: config?.password || process.env.NODE_MAILER_PASSWORD
      }
    })
  }

  /**
   * Get the compiled booking confirmation template
   * Uses the custom template if available, otherwise falls back to the default
   */
  private async getBookingConfirmationTemplate() {
    try {
      // Try to get a custom template from the database
      const template = await this.mailConfigService.getEmailTemplate(
        "booking_confirmation"
      )

      if (template?.content) {
        // Compile the custom template on demand
        return compile(template.content)
      }
    } catch (error) {
      console.error(
        "Error getting custom booking template, using default:",
        error
      )
    }

    // Fall back to the default template
    return DEFAULT_BOOKING_CONFIRMATION_TEMPLATE
  }

  /**
   * Sends an email to the user confirming their booking was made and specifying the dates
   *
   * @param recipientEmail the email for which the confirmation should be sent
   * @param recipientName the **full** name of the intended recipient
   * @param startDateString the pre-formatted date **string** of the *first* **night** in the user's booking
   * @param endDateString the pre-formatted date **string** of the *last* **night** in the user's booking
   */
  public async sendBookingConfirmationEmail(
    recipientEmail: string,
    recipientName: string,
    startDateString: string,
    endDateString: string
  ) {
    // Make sure transporter is initialized with latest config
    await this.initializeTransporter()

    if (!this.transporter) {
      throw new Error("Email transporter could not be initialized")
    }

    // Get the configured "from" header or use default
    const mailConfig = await this.mailConfigService.getMailConfig()
    const fromHeader = mailConfig?.fromHeader || '"UASC Bookings"'

    // Get the template (custom or default)
    const template = await this.getBookingConfirmationTemplate()

    const info = await this.transporter.sendMail({
      from: fromHeader,
      to: recipientEmail,
      subject: `Your booking from ${startDateString} to ${endDateString}`,
      html: template({
        name: recipientName,
        startDate: startDateString,
        endDate: endDateString
      })
    })

    console.log("Booking confirmation email sent: %s", info.messageId)
  }
}
