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
              width="100%"
              height="400"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Bruce%20Road,%20Manawat%C5%AB-Whanganui%203989+(My%20Business%20Name)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.gps.ie/">gps systems</a>
            </iframe>
          </div>
        </div>
      </FullPageBackgroundImage>
      <Footer />
    </>
  )
}

export default Contact
