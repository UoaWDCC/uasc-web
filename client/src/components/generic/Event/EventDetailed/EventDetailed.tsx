import Image from "next/image"
/**
 * Props for event card
 */
export interface IEventDetailed {
  /**
   * The date of the event as a string.
   * @example "THU 18/7 • 6pm"
   */
  date?: string

  /**
   * Link of google form to embed into the site
   */
  googleFormLink?: string

  /**
   * When the signups open (includes both _time_ and _date_),
   * this prop will have a side-effect on if the {@link googleFormLink}
   * is displayed
   */
  signUpOpenDate?: Date

  /**
   * The title of the event as a string
   * @example "I am sigma"
   */
  title: string

  /**
   * The location of the event as a string
   * @example "Basement"
   */
  location?: string

  /**
   * The content of the event as a react node
   */
  content: React.ReactNode

  /**
   * The callback for when the user attempts to return to any previous
   * view (e.g the list of events)
   */
  onBack: () => void

  /**
   * The image cover on the top of the card
   */
  image: string
}

/**
 * The view for users to sign up and see full information about the event.
 *
 * **No data fetching should be performed in this component**
 */
const EventDetailed = ({
  date,
  title,
  location,
  content,
  onBack,
  image,
  signUpOpenDate,
  googleFormLink
}: IEventDetailed) => {
  const Divider = () => {
    return <div className="bg-gray-3 mb-4 mt-4 h-[1px] w-full"></div>
  }
  return (
    <>
      <h5
        onClick={onBack}
        className="text-dark-blue-100 cursor-pointer self-start text-lg font-bold uppercase"
      >
        Back
      </h5>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex h-fit w-full justify-center border bg-white">
          <Image
            src={image}
            alt="Event cover image"
            width={500}
            height={300}
            className="block h-auto max-h-[400px] w-auto  py-4"
          />
        </div>
        <div className="h-full w-full gap-2 border bg-white p-8 text-center md:text-left">
          <h5 className="font-bold">{date}</h5>

          <h3 className="text-dark-blue-100 mt-1 font-bold">{title}</h3>
          <div className="text-gray-4 mt-2">{location}</div>
          <Divider />

          <div className="flex flex-col gap-4">
            <div className="text-left">{content}</div>

            {signUpOpenDate &&
              (signUpOpenDate <= new Date() ? (
                <>
                  <h5 className="font-bold uppercase">
                    <a href={googleFormLink} target="_blank" rel="noreferrer">
                      Sign Ups Open!
                    </a>
                  </h5>
                  {googleFormLink && <iframe src={googleFormLink} />}
                </>
              ) : (
                <>
                  <h5 className="font-bold">
                    Sign ups open at {signUpOpenDate.toLocaleString()}
                  </h5>
                  <a></a>
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default EventDetailed
