import UASCHeader from "assets/logos/2024logo.png"
import Button from "components/generic/FigmaButtons/FigmaButton"
import Facebook from "assets/logos/facebookBlue.png"
import Instagram from "assets/logos/instagramBlue.png"
import {Link} from "react-router-dom"

const LandingSection = () => (
    <section>
        <div
            className="bg-home-ski-image relative
         -mt-14 flex
         min-h-screen flex-col
         items-center justify-center
         overflow-hidden bg-cover bg-top bg-no-repeat"
        >
            <div className="bg-gray-1 pointer-events-none absolute -z-20 h-screen w-full opacity-90"/>
            <div className="z-10 flex flex-col items-center gap-8 text-center">
                <div className="flex lg:w-1/2 ">
                    <img
                        src={UASCHeader}
                        alt="UASC in big text"
                        className=" pointer-events-none"
                    />
                </div>

                <div className="ml-auto hidden items-center gap-6 pr-[32px] lg:flex">
                    <h3 className="text-dark-blue-100 font-normal tracking-tighter">
                        The largest sports club on campus, and <br/> the cheapest membership on Mt Ruapehu!
                    </h3>

                    <span>
            <a href="https://www.instagram.com/uasc_nz/" target="_blank" rel="noreferrer">
              <img src={Instagram} alt="Instagram Logo"/>
            </a>
          </span>

                    <span>
            <a href="https://www.facebook.com/UoAsnowsports/" target="_blank" rel="noreferrer">
              <img src={Facebook} alt="Facebook Logo"/>
            </a>
          </span>
                </div>


                <div className="flex flex-row">
                    <Link to="/register" className="cursor-pointer">
                        <Button>Sign up now!</Button>
                    </Link>
                    <Link to="/Login" className="cursor-pointer">
                        <Button>LOG IN</Button>
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
