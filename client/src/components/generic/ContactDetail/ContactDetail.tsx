export interface IContactDetail {
  /**
   * The main description of the contact
   *
   * @example "Admin"
   */
  title: string
  /**
   * The extended description of the contact
   *
   * @example "For all payment issues and queries"
   */
  description?: string
  /**
   * The email that is associated with the contact
   *
   * @example "mail@mail.com"
   */
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
