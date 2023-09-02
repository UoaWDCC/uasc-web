import React from "react";
import { Container, Divider, Paper, Typography  } from "@mui/material"
import DetailedBookings from "../components/AdminDetailedBookings";

const AdminBookingsDetailedView = () => {
    return (
        <div>
          <Paper
            elevation={2}
            sx={{
              margin: "32px",
              marginTop: "64px",
              padding: " 32px",
              backgroundColor: "#A8ADB0",
              borderRadius: "32px 0px 32px 0px",
            }}
          >
            <Typography variant="h3" align="left">
              {" "}
              ADMIN DASHBOARD{" "}
            </Typography>
            <Divider />
            <Container maxWidth={false} disableGutters={true} sx={{ display: "flex", justifyContent: "space-between", marginRight: "40%" }}>
                <Container maxWidth={false} disableGutters={true}>
                  <DetailedBookings />
                </Container>
            </Container>
          </Paper>
        </div>
      )
}

export default AdminBookingsDetailedView;