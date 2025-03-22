import Image from "next/image"
import { MembersOnlyMessage } from "../EventUtils/EventUtils"
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
   * If the event is over, to avoid the user signing up etc
   */
  isPastEvent?: boolean

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

  /**
   * If the event permits the current user to have access to sign up
   */
  hasSignUpRights?: boolean
  isMembersOnly?: boolean
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
  googleFormLink,
  isPastEvent,
  hasSignUpRights,
  isMembersOnly
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
        <div className="h-full w-full gap-2 border bg-white p-8 text-center md:text-left">
          {isPastEvent && (
            <h5 className="text-dark-blue-100 font-bold italic">
              Event has ended!
            </h5>
          )}
          <h5 className={`font-bold ${isPastEvent && "line-through"}`}>
            {date} <MembersOnlyMessage isMembersOnly={!!isMembersOnly} />
          </h5>

          <h3 className="text-dark-blue-100 mt-1 font-bold">{title}</h3>
          <div className="text-gray-4 mt-2">{location}</div>
          <Divider />

          <div className="flex flex-col gap-4">
            <div className="whitespace-pre-line text-left">{content}</div>
            {hasSignUpRights ? (
              <>
                {signUpOpenDate &&
                  !isPastEvent &&
                  googleFormLink &&
                  (signUpOpenDate <= new Date() ? (
                    <>
                      <h5 className="font-bold uppercase">Sign Ups Open!</h5>
                      <h5 className="text-dark-blue-100 font-bold uppercase italic">
                        <a
                          href={googleFormLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          CLICK ME TO GO TO FORM
                        </a>
                      </h5>
                      <iframe
                        height={"500"}
                        src={googleFormLink}
                        title="Google Forms Sign Up"
                      />
                    </>
                  ) : (
                    <>
                      <h5 className="font-bold">
                        Sign ups open at {signUpOpenDate.toLocaleString()}
                      </h5>
                    </>
                  ))}
              </>
            ) : (
              <h5 className="text-dark-blue-100 font-bold">
                Members Only Event {" - "}
                <a href="/register" className="text-light-blue-100 underline">
                  Become a member
                </a>
              </h5>
            )}
          </div>
        </div>

        <div className="flex h-fit w-full justify-center border bg-white">
          <Image
            src={image}
            alt="Event cover image"
            width={500}
            height={300}
            className="block h-auto max-h-[400px] w-auto  py-4"
          />
        </div>
      </div>
    </>
  )
}

export default EventDetailed
