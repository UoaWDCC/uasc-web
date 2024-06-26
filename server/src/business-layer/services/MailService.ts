import * as NodeMailer from "nodemailer"

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
   */
  public async sendBookingConfirmationEmail(
    recipientEmail: string,
    startDateString: string,
    endDateString: string
  ) {
    const info = await transporter.sendMail({
      from: '"UASC Bookings"',
      to: recipientEmail,
      subject: `Your booking from ${startDateString} to ${endDateString}`,
      html: `<p>
        Your booking from <strong>${startDateString}</strong> to <strong>${endDateString}</strong> has been confirmed. 
        Please email <a href="mailto:club.admin@uasc.co.nz">club.admin@uasc.co.nz</a> for any queries
      </p>`
    })

    console.log("Booking confirmation email sent: %s", info.messageId)
  }
}
