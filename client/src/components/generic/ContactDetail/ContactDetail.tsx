export interface IContactDetail {
  title: string
  description?: string
  email?: string
}

const ContactDetail = ({ title, description, email }: IContactDetail) => {
  return (
    <div className="flex flex-col gap-2">
      <h3>{title}</h3>
      <h5 className="opacity-90">{description}</h5>
      <h5 className="text-light-blue-100 font-bold">
        <a href={`mailto:${email}`}>{email}</a>
      </h5>
    </div>
  )
}

export default ContactDetail
