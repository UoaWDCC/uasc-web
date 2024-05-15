import UASCHeader from "assets/logos/2024logo.png"
import Button from "components/generic/FigmaButtons/FigmaButton"
import Facebook from "assets/logos/facebookBlue.png"
import Instagram from "assets/logos/instagramBlue.png"
import {Link} from "react-router-dom"

const LandingSection = () => (
    <section>
        <div
            className="bg-home-ski-image relative
         mt-14 flex
         min-h-screen flex-col
         items-center justify-center
         overflow-hidden bg-cover bg-top bg-no-repeat"
        >
            <div className="bg-gray-1 pointer-events-none absolute -z-20 h-screen opacity-90"/>
            <div className="z-10 flex flex-col gap-10 lg:gap-20 text-center mx-6">
                <div className="flex w-full">
                    <img
                        src={UASCHeader}
                        alt="UASC in big text"
                        className=" pointer-events-none w-full"
                    />
                </div>

                <div className="items-center gap-6 flex">
                    <p className="text-dark-blue-100 font-small tracking-tighter md:text-3xl">
                        The largest sports club on campus, and <br/> the cheapest
                        membership on Mt Ruapehu!
                    </p>

                    <span>
            <a
                href="https://www.facebook.com/UoAsnowsports/"
                target="_blank"
                rel="noreferrer"
            >
              <img src={Facebook} alt="Facebook Logo" className="w-14"/>
            </a>
          </span>

                    <span>
            <a
                href="https://www.instagram.com/uasc_nz/"
                target="_blank"
                rel="noreferrer"
            >
              <img src={Instagram} alt="Instagram Logo" className="w-14"/>
            </a>
          </span>
                </div>

                <div className="flex flex-row gap-6">
                    <Link to="/register" className="cursor-pointer w-full">
                        <Button variant="default-big">Sign up now!</Button>
                    </Link>
                    <Link to="/Login" className="cursor-pointer ml-auto w-full">
                        <Button variant="inverted-default-big">LOG IN</Button>
                    </Link>
                </div>
            </div>

            <h5 className="text-dark-blue-100 absolute bottom-3 uppercase sm:bottom-9">
                <a href="#about">Find out more</a>
            </h5>
        </div>
    </section>
)

export default LandingSection
