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
        </div>
      </FullPageBackgroundImage>
      <Footer />
    </>
  )
}

export default Contact
