import UASCHeader from "@/assets/icons/uascLOGO.svg"
import Button from "@/components/generic/FigmaButtons/FigmaButton"
import Facebook from "@/assets/icons/FacebookBlue.svg"
import Instagram from "@/assets/icons/InstagramBlue.svg"
import Link from "next/link"

const LandingSection = () => (
  <section>
    <div
      className="bg-home-ski-image relative flex
         min-h-screen flex-col
         items-center justify-center
         overflow-hidden bg-cover bg-top bg-no-repeat"
    >
      <div className="bg-gray-1 pointer-events-none absolute -z-20 h-screen opacity-90" />
      <div className="z-10 mx-6 flex flex-col gap-10 text-center lg:gap-20">
        <div className="flex w-full">
          <UASCHeader className=" pointer-events-none w-full" />
        </div>

        <div className="flex items-center gap-6">
          <p className="text-dark-blue-100 font-small tracking-tighter md:text-3xl">
            The largest sports club on campus, and <br /> the cheapest
            membership on Mt Ruapehu!
          </p>

          <span>
            <Link
              href="https://www.facebook.com/UoAsnowsports/"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook className="w-14" />
            </Link>
          </span>

          <span>
            <Link
              href="https://www.instagram.com/uasc_nz/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="w-14" />
            </Link>
          </span>
        </div>

        <div className="flex flex-row gap-6">
          <Link href="/register" className="w-full cursor-pointer">
            <Button variant="default-big">Sign up now!</Button>
          </Link>
          <Link href="/Login" className="ml-auto w-full cursor-pointer">
            <Button variant="inverted-default-big">LOG IN</Button>
          </Link>
        </div>
      </div>

      <h5 className="text-dark-blue-100 bottom-3 my-8 uppercase sm:bottom-9">
        <Link href="#about">Find out more</Link>
      </h5>
    </div>
  </section>
)

export default LandingSection
