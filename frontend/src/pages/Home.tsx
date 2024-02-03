import logo from "../assets/updated2023logo.png"
import ski from "../assets/skiimage.png"
import { Typography } from "@mui/material"
import React from "react"
import image1 from "../assets/instagram.png"
import image2 from "../assets/facebook.png"
import pricing from "../assets/pricing.png"
import details from "../assets/details.png"
import "./Home.css"
import { useAuthenticatedUser } from "../hooks/useAuthenticatedUser"

const Home = () => {
  const [user, metadata] = useAuthenticatedUser()

  return (
    <div className="split-container">
      <div className="top-left-section">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "80px",
          }}
        >
          <img src={ski} alt="ski" style={{ width: "35%", height: "160px" }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "0px",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "80%", height: "200px", paddingLeft: "20px" }}
          />
        </div>
        <div style={{ paddingLeft: "30px", paddingTop: "10px" }}>
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "black",
            }}
          >
            University of Auckland
          </Typography>
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Snowsports Club
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "40px",
            paddingBottom: "50px",
          }}
        >
          <div style={{ display: "flex" }}>
            <a
              href="https://www.instagram.com/uasc_nz/?hl=en"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={image1}
                alt="Instagram Logo"
                style={{ width: "100%" }}
              />
            </a>
            <a
              href="https://www.facebook.com/UoAsnowsports/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={image2} alt="Facebook Logo" style={{ width: "100%" }} />
            </a>
          </div>
        </div>
      </div>

      <div className="top-right-section">
        <div
          className="bottom-left-section"
          style={{ display: "flex", justifyContent: "center", height: "750px" }}
        >
          <img
            src="https://images.pexels.com/photos/2013658/pexels-photo-2013658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="ski picture"
            style={{ width: "100%", height: "auto", padding: "0 40px" }}
          />
        </div>
      </div>

      <div className="bottom-left-section">
        <div
          className="bottom-left-section"
          style={{ display: "flex", justifyContent: "center", height: "750px" }}
        >
          <img
            src="https://images.pexels.com/photos/896815/pexels-photo-896815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="ski picture"
            style={{ width: "100%", height: "100%", padding: "0 40px" }}
          />
        </div>
      </div>

      <div className="bottom-right-section">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "80px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "black",
            }}
          >
            2023 Membership Prices
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "25px",
            paddingBottom: "5px",
          }}
        >
          <img
            src={pricing}
            alt="Pricing"
            style={{ width: "80%", height: "125px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "30px",
          }}
        >
          <img
            src={details}
            alt="Details"
            style={{ width: "75%", height: "400px" }}
          />
        </div>
      </div>
      {/* Campbell's section */}
      <div>
        <h1 style={{ fontSize: "300px" }}>
          {user && metadata
            ? `👋, ${user.displayName} ${metadata.email}`
            : "Welcome to UASC!"}
        </h1>
      </div>
    </div>
  )
}

export default Home
