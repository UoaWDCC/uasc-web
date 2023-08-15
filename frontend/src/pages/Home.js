import logo from "../assets/updated2023logo.png";
import ski from "../assets/skiimage.png";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import image1 from "../assets/instagram.png";
import image2 from "../assets/facebook.png";
import pricing from "../assets/pricing.png";
import details from "../assets/details.png";
import './Home.css';
import logo from "../assets/2023_logo1-768x262-uasc.png"
import { Typography } from "@mui/material"
import { useAuthenticatedUser } from "../hooks/useAuthenticatedUser"

const Home = () => {
  const [user, metadata] = useAuthenticatedUser()

  return (
  <div className="split-container">
    <div className="top-left-section">
      <div style={{ paddingLeft: "270px", paddingTop: "60px"}}>
        <img src={ski} alt="ski" style={{ width: "40%"}} />
        </div>
        <div style={{ paddingLeft: "115px", paddingTop: "0px"}}>
          <img src={logo} alt="logo" style={{ width: "85%"}} />
          </div>
          <div style={{ paddingLeft: "30px", paddingTop: "10px"}}>
            <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "black",
            }}
            >
              University  of  Auckland 
              </Typography>
              <Typography
              variant="h4"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                color: "black",
              }}
              >
                Snowsports  Club
                </Typography>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ paddingLeft: "310px", paddingTop: "70px", paddingRight: "5px"}}>
                    <a href="https://www.instagram.com/uasc_nz/?hl=en" target="_blank" rel="noreferrer">
                      <img src={image1} alt="Instagram Logo" style={{ width: "100%"}} />
                      </a>
                      </div> 
                      <div style={{ paddingLeft: "5px", paddingTop: "70px", paddingRight: "290px"}}>
                        <a href="https://www.facebook.com/UoAsnowsports/" target="_blank" rel="noreferrer">
                          <img src={image2} alt="Facebook Logo" style={{ width: "100%"}} />
                          </a>
                          </div>
                          </div>
                          </div>

    <div className="top-right-section" style={{ height: '730px' }}>
      <img
      src="https://images.pexels.com/photos/2013658/pexels-photo-2013658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
      alt="ski picture"
      style={{ width: '100%', height: 'auto', padding: '0 40px' }} 
      />
      </div>


    <div className="bottom-left-section" style={{ height: '800px' }}>
      <img
      src="https://images.pexels.com/photos/896815/pexels-photo-896815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
      alt="ski picture"
      style={{ width: '100%', height: '100%', padding: '0 40px' }} 
      />
      </div>

    <div className="bottom-right-section">
      (text)
      <div style={{ paddingTop: "100px", paddingRight: "20px"}}>
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
          <div style={{ paddingLeft: "42px", paddingTop: "10px"}}>
            <img src={pricing} alt="Pricing" style={{ width: "90%"}} />
            </div>
            <div style={{ paddingLeft: "80px", paddingTop: "15px"}}>
              <img src={details} alt="Details" style={{ width: "80%"}} />
              </div>
              </div>
              </div>
  );
};

      <div>
        <h1 style={{ fontSize: "300px" }}>
          {user && metadata
            ? `👋, ${user.displayName} ${metadata.email}`
            : "Welcome to UASC!"}
        </h1>
      </div>
    </>
  )
}

export default Home
