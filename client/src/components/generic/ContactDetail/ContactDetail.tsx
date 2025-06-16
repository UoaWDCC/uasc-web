import { ContactDetailLink } from "@/models/sanity/ContactDetail/Utils"

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

  /**
   * The link to the contact page or external contact form
   *
   * @example "https://example.com/contact"
   */
  links?: ContactDetailLink[]
}

const ContactDetail = ({
  title,
  description,
  email,
  links
}: IContactDetail) => {
  return (
    <div className="flex flex-col gap-2">
      <h3>{title}</h3>
      <h5 className="opacity-90">{description}</h5>
      <h5 className="text-light-blue-100 font-bold">
        <a href={`mailto:${email}`}>{email}</a>
      </h5>
      {links && links.length > 0 && (
        <ul className="flex flex-col gap-1">
          {links.map(({ url, displayName }) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-blue-100 hover:underline"
              >
                {displayName}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ContactDetail
