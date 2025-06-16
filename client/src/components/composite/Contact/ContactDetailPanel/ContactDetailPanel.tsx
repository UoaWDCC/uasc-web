import ContactDetail, {
  IContactDetail
} from "@/components/generic/ContactDetail/ContactDetail"

export interface IContactDetailPanel {
  items: IContactDetail[]
}

const ContactDetailPanel = ({ items }: IContactDetailPanel) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border border-black bg-white p-4">
      {items.map((item) => {
        return (
          <span key={item.email}>
            <ContactDetail
              title={item.title}
              description={item.description}
              email={item.email}
              links={item.links}
            />
          </span>
        )
      })}
    </div>
  )
}

export default ContactDetailPanel
