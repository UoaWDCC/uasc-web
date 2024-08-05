import Button from "@/components/generic/FigmaButtons/FigmaButton"
import Link from "next/link"
import UASCLogo from "./utils/UASCLogo"

const LandingSection = () => (
  <section>
    <div
      className="relative isolate
         flex min-h-[calc(100vh-51px)]
         flex-col items-center
         justify-center overflow-hidden"
    >
      <video
        src="/videos/hero-background.mp4"
        autoPlay
        muted
        loop
        className="pointer-events-none absolute -z-10 h-full w-full object-cover brightness-75"
      />

      <div className="flex w-full max-w-96 flex-1 flex-col justify-center gap-y-12 px-6 text-center lg:gap-16">
        <div className="flex flex-col items-center sm:gap-y-2">
          <UASCLogo className="size-40 text-white drop-shadow-md sm:size-56 lg:size-80" />
          <p className="text-lg font-extrabold text-white drop-shadow-md sm:text-2xl lg:text-3xl">
            UNIVERSITY OF AUCKLAND SNOWSPORTS CLUB
          </p>
        </div>
        <div className="flex flex-row gap-x-4 sm:hidden">
          <Link href="/register" className="w-full cursor-pointer">
            <Button variant="inverted-default-big">Sign up now!</Button>
          </Link>
          <Link href="/login" className="w-full cursor-pointer">
            <Button variant="default-big">LOG IN</Button>
          </Link>
        </div>
      </div>

      <h5 className="my-8 uppercase text-white drop-shadow-md">
        <Link href="#about">Find out more</Link>
      </h5>
    </div>
  </section>
)

export default LandingSection
