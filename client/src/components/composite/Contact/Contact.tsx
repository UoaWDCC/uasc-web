import FullPageBackgroundImage from "@/components/generic/FullPageBackgroundImage/FullPageBackgroundImage"
import ContactDetailPanel, {
  IContactDetailPanel
} from "./ContactDetailPanel/ContactDetailPanel"
import { Footer } from "@/components/generic/Footer/Footer"

interface IContact extends IContactDetailPanel {}

const Contact = ({ items }: IContact) => {
  return (
    <>
      <FullPageBackgroundImage>
        <div className="flex w-full max-w-[800px] flex-col gap-4 py-4">
          <h2 className="text-dark-blue-100 italic">Contact Us</h2>
          <ContactDetailPanel items={items} />
          <div className="w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3090.3296850757993!2d175.5528169760526!3d-39.235387071653925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d6b01d610042f1d%3A0x1071f4930186b3c0!2sUniversity%20of%20Auckland%20Snowsports%20Club!5e0!3m2!1sen!2snz!4v1722071878514!5m2!1sen!2snz"
              width="100%"
              height="450"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </FullPageBackgroundImage>
      <Footer />
    </>
  )
}

export default Contact
