import ContactDetail, {
  IContactDetail
} from "@/components/generic/ContactDetail/ContactDetail"

export interface IContactDetailPanel {
  items: IContactDetail[]
}

const ContactDetailPanel = ({ items }: IContactDetailPanel) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md bg-white p-4">
      {items.map((item) => {
        return (
          <>
            <ContactDetail
              key={item.email}
              title={item.title}
              description={item.description}
              email={item.email}
            />
          </>
        )
      })}
    </div>
  )
}

export default ContactDetailPanel
