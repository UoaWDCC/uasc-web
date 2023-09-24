import { Grid, Typography, Box, Divider, Paper } from "@mui/material"

const AdminBookingDetails = ({ selectedUser, checkInDate, checkOutDate, totalDays }) => {
  const styles = {
    outerBackground: {
      borderRadius: 15,
      backgroundColor: "gray",
      padding: "20px",
      boxShadow: "none",
    },
    requestBlock: {
      borderRadius: 15, // Change the value as needed
      backgroundColor: "lightblue",
      padding: "5px", // Add padding as needed
      boxShadow: "none",
      marginBottom: "5px",
    },
  }

  return (
    <div>
      <Grid container rowSpacing={2} paddingTop="20px" sx={{ width: 850 }}>
        <Grid item xs={12} md={8}>
          {" "}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography
            variant="h5"
            align="right"
            paddingTop="9px"
            paddingBottom="1px"
            sx={{ fontWeight: "bold" }}
          >
            HIDE
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} style={styles.outerBackground}>
            <Paper elevation={0} style={styles.requestBlock}>
              <Box paddingLeft="10px">
                <Typography
                  variant="h5"
                  align="left"
                  sx={{ fontWeight: "bold" }}
                >
                  BOOKING DETAILS
                </Typography>
                <Divider width="200px" />
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ fontWeight: "bold" }}
                >
                  User: {selectedUser}
                </Typography>
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ fontWeight: "bold" }}
                >
                  Check In Date: {checkInDate}
                </Typography>
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ fontWeight: "bold" }}
                >
                  Check Out Date: {checkOutDate}
                </Typography>
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ fontWeight: "bold" }}
                >
                  Total Days: {totalDays}
                </Typography>
              </Box>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
export default AdminBookingDetails
