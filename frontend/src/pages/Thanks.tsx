import React from "react"
import { Typography, Stack, Container } from "@mui/material"
import tick from "../assets/tick.png"

const Thanks = () => {
  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        height: "100%",
        width: "100%",
        backgroundImage:
          "radial-gradient(ellipse 50% 50% at 30% 30%, #81c7ebaa, #ffffff)",
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3} sx={{ paddingTop: "124px" }}>
          <Typography
            variant="h4"
            align="center"
            color="#474747"
            sx={{ fontWeight: "bold" }}
          >
            Thank you for your payment!
          </Typography>
          <img
            src={tick}
            alt="Payment Successful"
            style={{
              height: "200px",
              width: "200px",
              margin: "auto",
              marginTop: "20px",
            }}
          />
        </Stack>
      </Container>
    </div>
  )
}

export default Thanks
