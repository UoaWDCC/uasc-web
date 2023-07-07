import "./FaqApp.css";
// import Header from "./components/Header";
import Container from "@mui/material/Container";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material/";
import Grid from "@mui/material/Grid";
// import Navbar from "./components/Navbar";
// import {
//   ThemeProvider,
//   createTheme,
//   responsiveFontSizes,
// } from "@mui/material/styles";
import { useRef } from "react";

function App() {
  const isSmallScreen = useMediaQuery("(max-width: 900px)");
  const tableCount = isSmallScreen ? 1 : 3;

  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const useStyles = {
    gridItem1: {
      backgroundColor: "#81C7EB",
      padding: "0px",
      marginTop: "6px",
    },
    gridItem2: {
      backgroundColor: "#51A1DD",
      padding: "0px",
      marginTop: "6px",
    },
    gridItem3: {
      backgroundColor: "#dcdcdc",
      padding: "0px",
      marginTop: "6px",
      marginRight: "0px",
    },
    gridItem4: {
      backgroundColor: "#dcdcdc",
      padding: "0px",
      marginTop: "6px",
      marginRight: "0px",
    },
    gridItem5: {
      backgroundColor: "#dcdcdc",
      padding: "0px",
      marginTop: "6px",
      marginRight: "0px",
    },
    accordionTable1: {
      backgroundColor: "#81C7EB",
    },
    headerTable1: {
      background: "#81A0FF",
      marginBottom: "5px",
      padding: "2px",
    },
    headerTable2: {
      background: "#81A0FF",
      marginBottom: "5px",
      padding: "2px",
    },
    headerTable3: {
      background: "#81A0FF",
      marginBottom: "5px",
      padding: "2px",
    },
    headerTable4: {
      background: "#81A0FF",
      marginBottom: "5px",
      padding: "2px",
    },
    headerTable5: {
      background: "#81A0FF",
      marginBottom: "5px",
      padding: "2px",
    },
    faqHeader: {
      textAlign: "center",
      background: "#1abc9c",
      padding: 60,
      marginTop: 0,
      color: "white",
    },
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <h1 style={useStyles.faqHeader}>FAQ</h1>
      <Container maxWidth="xl">
        <Grid container columnSpacing={3} rowSpacing={3} xs>
          {/* membership */}
          <Grid
            item
            xs={12}
            md={3.9}
            // style={useStyles.gridItem1}
            // sx={{
            //   border: 1,
            //   borderColor: "#81C7EB",
            //   border: "10px solid",
            //   borderRadius: "16px",
            // }}
          >
            <Box sx={{ boxShadow: 0 }} style={useStyles.headerTable1}>
              <h1 align="center">Membership:</h1>
            </Box>
            <Accordion style={useStyles.accordionTable1}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  Can I join the club at any point in the year?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes, but it’s much cheaper during O-Week and Re-OWeek. Make
                  sure to take advantage of the cheaper membership rates and
                  sign up!
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={useStyles.accordionTable1}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  Do I need to be a university student to sign up?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Absolutely not! UASC is a student club run by University of
                  Auckland students but we encourage everyone to join us. The
                  membership fees for non-UoA students differ but you still get
                  all the benefits of being a UASC member.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={useStyles.accordionTable1}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  What does being a UASC member get me?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Not only does being a UASC member get you cheaper tickets to
                  our events, but you also get discounts with our sponsors!
                  While you do not need to be a UASC member for most of the
                  events, you will need to spend extra to get non-member tickets
                  and are unavailable to sign up to our most popular event
                  Varisty week which is reserved only for UASC members. In
                  addition to this, while anyone can book the lodge, only
                  members can book into the lodge on weekends.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={useStyles.accordionTable1}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  Can I join if I can't ski or snowboard?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Absolutely! We are completely open to beginners – UASC is the
                  perfect place to learn, with many people ready to help you
                  out. We offer Snowplanet nights where you can ease into the
                  world of snowsports and also a beginners weekend at the lodge!
                  If you’re not quite ready to get into snow sports, we also
                  host a wide range of non-snow related events so get amongst
                  it!
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={useStyles.accordionTable1}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  Can I get a refund on my membership?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  No. Unfortunately, we cannot offer refunds on membership fees.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          {/* events */}
          <Grid item xs={12} md={3.9}>
            <Box sx={{ boxShadow: 0 }} style={useStyles.headerTable1}>
              <h1 align="center">Events:</h1>
            </Box>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  If I’m only here for this semester is it worth signing up?
                  What kind of events do you guys run in the offseason?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We hold a lot of Auckland based events at shadows, members get
                  free or heavily subsidised entry fees. We also have Snowplanet
                  nights starting at the end of March, members get heavily
                  discounted access on members nights.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  Do you run ‘trips’?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  In the offseason, we will be running a Tongariro crossing
                  trip.
                  <br />
                  <br />
                  During the winter season, we run organised weekends to our
                  lodge on whakapapa (around 4 per year) where we organise all
                  your food and transport so you can focus on having a great
                  time. There’s always a theme and a big party.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  When does the season start/end?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Projected 2023 opening dates are to be determined at a later
                  date.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          {/* bookings */}
          <Grid item xs={12} md={3.9}>
            <Box sx={{ boxShadow: 0 }} style={useStyles.headerTable1}>
              <h1 align="center">Bookings:</h1>
            </Box>
            <Accordion style={useStyles.gridItem5}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  How do I book?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Simply sign up as a member, and log in through our website.
                  Our booking system allows you to pick your ski dates and plan
                  out your season to get as many snow days as possible!
                  <br />
                  <br />
                  The bookings will open month by month to provide everyone with
                  a chance to book throughout the season.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={useStyles.gridItem5}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  Why are some weekends blocked for bookings?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  These are the dates reserved for organised events and spaces
                  will become available through Facebook when the events are
                  posted.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={useStyles.gridItem5}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  If the lodge is full, is there a waitlist or overflow
                  accommodation available?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Please email club.admin@uasc.co.nz if you wish to be placed on
                  the waitlist or for further queries about overflow.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          {/* lodge */}
          <Grid item xs={12} md={5.9}>
            <Box sx={{ boxShadow: 0 }} style={useStyles.headerTable1}>
              <h1 align="center">Lodge:</h1>
            </Box>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  Why is it cheap?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Our goal as a club is to make snowsports as accessible as
                  possible to our members and fellow students at The University
                  of Auckland. We keep the prices low and the value good so that
                  everybody can go hard at the mountain, and go home without
                  breaking the bank.
                  <br />
                  <br />
                  The club is a non-profit run by students and members, and
                  staying at our lodge is possibly the best experience you can
                  have as a student on the mountain. We ask that you be a tidy
                  kiwi and help out with daily duties to keep our lodge running
                  smoothly.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  How do I get to the lodge?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  During the season, UASC members will be doing trips all week,
                  and definitely on weekends. Like our Facebook Page and Ride
                  Share Group to arrange carpooling with other members. Or if
                  you have space in your car and want to share the cost of gas,
                  advertise a few seats on the ride share group. Please note
                  that if you are organising your own transport it is your
                  responsibility to make sure that you can get up the mountain
                  (that means a suitable vehicle and chains if you need them).
                  <br />
                  <br />
                  We also run club trips on weekends throughout the season with
                  organised transport. See our event page for info.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  Where is the lodge?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Our lodge is in one of the most convenient spots on the
                  mountain. We’re in the Iwikau Village, Whakapapa. Just take a
                  left at the top of Bruce Road, come down loop road and you’ll
                  find overnight parking and the UASC lodge on your left. Look
                  for The University of Auckland Snowsports Club sign over the
                  door. For a more detailed map and description see our contact
                  page.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  Where do I park?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  There is overnight parking all along the loop road where our
                  lodge is located. From 2020, if you are arriving in the
                  evening then you can drive up the mountain and park in one of
                  the clubs car parks. If you are arriving in the morning or
                  during the day then you will need to book a parking spot
                  through RAL, this goes live on the 8th of July and you can
                  find the FAQ here.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  What do I need to bring?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  At the very least you’ll need a sleeping bag and basic
                  toiletries. We also recommend the following:
                  <br />
                  <br />
                  &#x2022; Pillow
                  <br />
                  &#x2022; Sheet for the mattress
                  <br />
                  &#x2022; Towel Lunch food (there are also cafes up the
                  mountain)
                  <br />
                  &#x2022; Warm clothing (we have a fireplace but it’s still a
                  snowy mountain)
                  <br />
                  &#x2022; Your ski gear!
                  <br />
                  <br />
                  You’ll probably also want to bring snacks if you eat lots, and
                  alcohol if you’re that way inclined. We definitely are. We
                  have a fridge for members to use, and a huge deck outside to
                  keep your drinks chilly.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  What time is check-in/ checkout?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Arrive any time after 5pm.
                  <br />
                  You must checkout by 11am.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  What are the sleeping arrangements?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We have two bunk rooms, with 32 spaces total. The bunks are
                  clustered in groups of about 4-8 beds. There are 24 single
                  bunks and 4 double bunks.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                onClick={handleClick}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography style={{ fontWeight: "bold" }}>
                  What facilities do you have?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  &#x2022; Shared bunk rooms
                  <br />
                  &#x2022; Kitchen facilities – fridge, water on tap, tea and
                  coffee, a funnel
                  <br />
                  &#x2022; Lounge, pit, and fireplace
                  <br />
                  &#x2022; Male and female bathrooms with hot showers
                  <br />
                  &#x2022; Drying room for all your wet gear after a hard day
                  out on the ice
                  <br />
                  &#x2022; Ski storage/tuning room, tuning tools by request to
                  the custodian if we can trust you
                  <br />
                  &#x2022; Games and stuff
                  <br />
                  &#x2022; Two great-hall style dining tables which are
                  excellent for beer pong
                </Typography>
              </AccordionDetails>
            </Accordion>
            <div ref={ref}></div>
          </Grid>
          {/* gear and lift passes */}
          <Grid item xs={12} md={5.9} styles={{ marginBottom: "60px" }}>
            <Box sx={{ boxShadow: 0 }} style={useStyles.headerTable1}>
              <h1 align="center">Gear and Lift passes:</h1>
            </Box>
            <Accordion style={useStyles.gridItem5}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  What's the cost of skiing on Ruapehu?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The following was the scheme for last year. Due to unique
                  circumstances, the current price scheme is to be determined at
                  a closer date.
                  <br />
                  <br />
                  &#x2022; You can currently get a season pass for $499 this
                  price ends March 15th unless sold out prior!
                  <br />
                  &#x2022; Weekday season passes only $199
                  <br />
                  &#x2022; Day passes for a student is ~$80
                  <br />
                  &#x2022; People with a season pass can get you a 50% off
                  ‘buddy pass’
                  <br />
                  &#x2022; Prices decrease the more days you purchase for passes
                  and rentals
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion style={useStyles.gridItem5}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontWeight: "bold" }}>
                  How much of a discount can you get through Snowcentre/ what do
                  they offer us?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  &#x2022; 10% throughout the year, just mention you’re from
                  UASC.
                  <br />
                  &#x2022; Ski sale at the end of May, huge discounts and lots
                  of second-hand items.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
