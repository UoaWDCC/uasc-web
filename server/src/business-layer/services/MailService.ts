import * as NodeMailer from "nodemailer"
import path from "path"
import { compileFile } from "pug"

const TEMPLATE_BASE_PATH = path.join(__dirname, "..", "templates")

const transporter = NodeMailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD
  }
})

export default class MailService {
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
    const compiledFunction = compileFile(
      `${TEMPLATE_BASE_PATH}/BookingConfirmation.pug`
    )

    const info = await transporter.sendMail({
      from: '"UASC Bookings"',
      to: recipientEmail,
      subject: `Your booking from ${startDateString} to ${endDateString}`,
      html: compiledFunction({
        name: recipientName,
        startDate: startDateString,
        endDate: endDateString
      })
    })

    console.log("Booking confirmation email sent: %s", info.messageId)
  }
}
