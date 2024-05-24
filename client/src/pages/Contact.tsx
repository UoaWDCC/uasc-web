import ContactForm from "components/composite/ContactForm/ContactForm"
import { Typography, Stack, Container } from "@mui/material"

const Contact = () => {
  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        height: "100%",
        width: "100%",
        backgroundImage:
          "radial-gradient(ellipse 50% 50% at 30% 30%, #81c7ebaa, #ffffff)"
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3} sx={{ paddingTop: "124px" }}>
          <Typography
            variant="h1"
            align="left"
            color="#474747"
            sx={{ fontWeight: "bold" }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="h4"
            align="left"
            color="#457CC3"
            sx={{ fontWeight: "900" }}
          >
            Have a question? Send us a message!
          </Typography>
          <ContactForm />
        </Stack>
      </Container>
    </div>
  )
}

export default Contact
