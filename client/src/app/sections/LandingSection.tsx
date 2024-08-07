import ChevronDown from "@/assets/icons/downarrow.svg"
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
      <div className="pointer-events-none absolute -z-10 h-full w-full brightness-[0.5]">
        <div className="absolute inset-0" />
        <video
          autoPlay
          muted
          playsInline
          loop
          poster="/images/landing-video-placeholder.webp"
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          <source src="/videos/hero-background.webm" type="video/webm" />
        </video>
      </div>

      <div className="flex w-full max-w-96 flex-1 flex-col justify-center gap-y-12 px-6 text-center lg:gap-16">
        <div className="flex flex-col items-center sm:gap-y-2">
          <UASCLogo className="size-40 text-white drop-shadow-md sm:size-56 lg:size-80" />
          <p className="text-lg font-semibold text-white drop-shadow-md sm:text-2xl lg:text-3xl">
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

      <Link href="#about" className="mb-8 flex flex-col items-center gap-y-2">
        <h5 className="uppercase text-white drop-shadow-md">Find out more</h5>
        <ChevronDown className="size-3 fill-white" />
      </Link>
    </div>
  </section>
)

export default LandingSection
