import { Footer } from "@/components/generic/Footer/Footer"
import ContactDetailPanel, {
  type IContactDetailPanel
} from "./ContactDetailPanel/ContactDetailPanel"

interface IContact extends IContactDetailPanel {}

const Contact = ({ items }: IContact) => {
  return (
    <>
      <div
        className="bg-mountain-background-image relative z-10 flex min-h-[100vh] w-fit
      min-w-full flex-col items-center bg-cover bg-top bg-no-repeat md:px-8"
      >
        <div className="bg-gray-1 pointer-events-none absolute -z-30 h-full w-full opacity-70" />
        <div className="z-20 flex w-full max-w-[800px] flex-col items-center gap-4 pb-8 pt-16">
          <h2 className="text-dark-blue-100 mr-auto italic">Contact Us</h2>
          <ContactDetailPanel items={items} />
          <div className="mb-4 mt-4 w-full">
            <iframe
              title="UASC Lodge Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3090.3296850757993!2d175.5528169760526!3d-39.235387071653925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d6b01d610042f1d%3A0x1071f4930186b3c0!2sUniversity%20of%20Auckland%20Snowsports%20Club!5e0!3m2!1sen!2snz!4v1722071878514!5m2!1sen!2snz"
              width="100%"
              height="450"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Contact
