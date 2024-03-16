import React from "react"
import { Button, TextField, Typography, Stack } from "@mui/material"

const ContactForm = () => {
  const handleSubmit = () => {
    console.log("Form submitted")
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.14)"
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Stack>
            <Typography variant="h6" align="left" color="#457CC3">
              Name
            </Typography>
            <TextField
              variant="standard"
              required
              sx={{ backgroundColor: "#EDF8FF" }}
              InputProps={{
                disableUnderline: true
              }}
              style={{
                width: "100%",
                background: "#EDF8FF",
                // @ts-ignore
                "&:hover": {
                  borderColor: "transparent"
                },
                borderRadius: "5px"
              }}
            />
          </Stack>
          <Stack>
            <Typography variant="h6" align="left" color="#457CC3">
              Email Address
            </Typography>
            <TextField
              variant="standard"
              required
              sx={{ backgroundColor: "#EDF8FF" }}
              InputProps={{
                disableUnderline: true
              }}
              style={{
                width: "100%",
                background: "#EDF8FF",
                // @ts-ignore
                "&:hover": {
                  borderColor: "transparent"
                },
                borderRadius: "5px"
              }}
            />
          </Stack>
          <Stack>
            <Typography variant="h6" align="left" color="#457CC3">
              Message
            </Typography>
            <TextField
              variant="standard"
              multiline
              rows={5}
              placeholder="Write your message here..."
              // onChange={(e) => setRequestMessage(e.target.value)}
              InputProps={{
                disableUnderline: true
              }}
              style={{
                width: "100%",
                background: "#EDF8FF",
                // @ts-ignore
                "&:hover": {
                  borderColor: "transparent"
                },
                borderRadius: "5px"
              }}
              required
            />
          </Stack>
          <Stack justifyContent="center" alignItems="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "100px",
                paddingX: "24px",
                textTransform: "none",
                width: "fit-content"
              }}
            >
              SUBMIT
            </Button>
          </Stack>
        </Stack>
      </form>
    </div>
  )
}

;<style></style>

export default ContactForm
