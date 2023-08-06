import { Grid, Typography, Box, Divider, Paper, Button } from "@mui/material"

const RequestDetails = () => {
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

  const textBreakStyle = {
    display: "block",
    marginBottom: -6,
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
                  badabing
                </Typography>
                <Divider width="200px" />
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ fontWeight: "bold" }}
                >
                  blah
                  <span style={textBreakStyle}></span>
                  blah blah blah
                  <span style={textBreakStyle}></span>
                  blah blah blah
                </Typography>
                <Grid container rowSpacing={2} paddingTop="25px">
                  <Grid item xs={12} md={6} align="center">
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      old dates
                    </Typography>
                    <Box
                      sx={{
                        height: "300px",
                        width: "300px",
                      }}
                    >
                      <Paper
                        elevation={0}
                        style={styles.outerBackground}
                        sx={{ height: 1 }}
                      ></Paper>
                    </Box>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        margin: "20px",
                        paddingLeft: "60px",
                        paddingRight: "60px",
                      }}
                    >
                      APPROVE
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6} align="center">
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      new dates
                    </Typography>
                    <Box
                      sx={{
                        height: "300px",
                        width: "300px",
                      }}
                    >
                      <Paper
                        elevation={0}
                        style={styles.outerBackground}
                        sx={{ height: 1 }}
                      ></Paper>
                    </Box>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        margin: "20px",
                        paddingLeft: "60px",
                        paddingRight: "60px",
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
