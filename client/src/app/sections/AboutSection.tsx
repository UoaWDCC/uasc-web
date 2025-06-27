import Link from "next/link"

interface IAboutSection {
  title?: string
  description?: string
  subheading?: string
}

const DEFAULT_TITLE = "Get ready for the best year of your life!" as const
const DEFAULT_SUBHEADING =
  `The University of Auckland Snowsports Club is back again for another banging year, and it's time to lock in your membership for ${new Date().getFullYear()}!` as const
const DEFAULT_DESCRIPTION =
  "Whether you're new to the club or an old fart coming back for more, we can't wait to see your pretty face for a year of sending and shredding on and off the slopes!" as const

const AboutSection = ({
  title = DEFAULT_TITLE,
  subheading = DEFAULT_SUBHEADING,
  description = DEFAULT_DESCRIPTION
}: IAboutSection) => (
  <section id="about">
    <div
      className="bg-home-about-image relative
         z-0  flex min-h-screen
         flex-col  items-center justify-center
         overflow-hidden bg-cover
         bg-top bg-no-repeat px-4 py-8 lg:min-h-fit lg:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="bg-gray-1 pointer-events-none absolute -z-20 h-screen w-full opacity-20" />
        <div className="text-dark-blue-100 flex flex-col gap-6 text-center lg:max-w-[450px] lg:text-left">
          <h2 className="italic">{title}</h2>
          <div>
            <h4>{subheading}</h4>
            <p className="mt-2">{description}</p>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <iframe
            className="aspect-[350/274] w-full max-w-[350px] rounded-md"
            src="https://www.youtube.com/embed/HBB9h_rBJOc?si=uyYmhlmQosbDFIB9"
            title="O Week UASC"
            allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="col-span-2 hidden flex-row justify-center gap-x-4 sm:flex">
          <Link href="/register" className="w-60 cursor-pointer">
            <button
              className="border-dark-blue-100 text-dark-blue-100 hover:bg-dark-blue-100 flex
              w-full flex-col items-center rounded-md bg-white py-3 font-sans font-bold uppercase
              enabled:border enabled:hover:text-white disabled:bg-gray-400 md:py-4 md:text-2xl"
              type="button"
            >
              Sign up now!
            </button>
          </Link>
          <Link href="/login" className="w-60 cursor-pointer">
            <button
              className="bg-dark-blue-100 enabled:hover:text-dark-blue-100 border-dark-blue-100 disabled:bg-dark-blue-60
              flex w-full flex-col items-center rounded-md py-3 font-sans
              font-bold uppercase text-white hover:bg-white enabled:border
              md:py-4 md:text-2xl"
              type="button"
            >
              LOG IN
            </button>
          </Link>
        </div>
      </div>
    </div>
  </section>
)

export default AboutSection
