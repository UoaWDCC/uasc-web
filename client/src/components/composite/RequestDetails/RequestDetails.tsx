import { Grid, Typography, Box, Divider, Paper, Button } from "@mui/material"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"

const RequestDetails = ({ booking_id, setSelectedUser }: any) => {
  const styles = {
    outerBackground: {
      borderRadius: 15,
      backgroundColor: "gray",
      padding: "20px",
      boxShadow: "none"
    },
    requestBlock: {
      borderRadius: 15, // Change the value as needed
      backgroundColor: "lightblue",
      padding: "5px", // Add padding as needed
      boxShadow: "none",
      marginBottom: "5px"
    }
  }

  const textBreakStyle = {
    display: "block",
    marginBottom: -6
  }

  return (
    <div>
      <Grid container rowSpacing={2} paddingTop="20px" sx={{ width: 1000 }}>
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
            onClick={() => setSelectedUser(null)}
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
                  {booking_id}
                </Typography>
                <Divider />
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ fontWeight: "bold" }}
                >
                  {booking_id}
                  <span style={textBreakStyle}></span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                  <span style={textBreakStyle}></span>
                  blah blah blah
                </Typography>
                <Grid container rowSpacing={2} paddingTop="25px">
                  {/* @ts-ignore */}
                  <Grid xs={12} md={6} align="center" sx={{ padding: 0 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      OLD DATES
                    </Typography>
                    <DateCalendar
                      sx={{
                        backgroundColor: "white",
                        borderRadius: 15,
                        height: 300,
                        margin: 0
                      }}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        margin: "20px",
                        paddingLeft: "60px",
                        paddingRight: "60px"
                      }}
                    >
                      APPROVE
                    </Button>
                  </Grid>
                  {/* @ts-ignore */}
                  <Grid item xs={12} md={6} align="center">
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      NEW DATES
                    </Typography>
                    <DateCalendar
                      sx={{
                        height: 300,
                        margin: 0,
                        backgroundColor: "white",
                        borderRadius: 15
                      }}
                    />
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        margin: "20px",
                        paddingLeft: "60px",
                        paddingRight: "60px"
                      }}
                    >
                      REJECT
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
export default RequestDetails
