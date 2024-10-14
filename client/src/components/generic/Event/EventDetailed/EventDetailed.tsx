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
   * When the signups open
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
   * The function when the button on the card / preview card is clicked
   */
  onBack: () => void

  /**
   * The image cover on the top of the card
   */
  image: string
}

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
        <div className="h-full w-full border bg-white p-8 text-center md:text-left">
          <h5 className="font-bold">{date}</h5>

          <h3 className="text-dark-blue-100 mt-1 font-bold">{title}</h3>

          <div className="text-gray-4 mt-2">{location}</div>
          <Divider />

          <div className="text-left">{content}</div>

          {signUpOpenDate &&
            (signUpOpenDate <= new Date() ? (
              <>
                <h5>Sign Ups Open!</h5>
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
    </>
  )
}

export default EventDetailed
