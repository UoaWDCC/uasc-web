import { Grid, Typography, Box, Divider, Paper } from "@mui/material"

const AdminDashboardRequest = () => {
  const gridItemStyle = {
    gridItem1: {
      borderRadius: 15, // Change the value as needed
      backgroundColor: "gray", // Change the background color as needed
      padding: "20px", // Add padding as needed
      boxShadow: "none",
    },

    gridItem2: {
      borderRadius: 15, // Change the value as needed
      backgroundColor: "pink", // Change the background color as needed
      padding: "5px", // Add padding as needed
      boxShadow: "none",
      marginBottom: "5px",
    },
    gridItem3: {
      borderRadius: 15, // Change the value as needed
      backgroundColor: "lightblue", // Change the background color as needed
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
      <Grid container rowSpacing={2} paddingTop="20px">
        <Grid item xs={6}>
          <Typography variant="h4" align="left">
            REQUESTS
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" align="right">
            MANAGE
          </Typography>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={0} style={gridItemStyle.gridItem1}>
            <Grid
              sx={{
                overflowY: "scroll",
                maxHeight: "600px",
              }}
            >
              <Grid item xs={12}>
                <Paper elevation={0} style={gridItemStyle.gridItem2}>
                  <Box paddingLeft="10px">
                    <Typography
                      variant="h5"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      USER 1
                    </Typography>
                    <Divider width="200px" />
                    <Typography
                      variant="h6"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      DATE CHANGE
                      <span style={textBreakStyle}></span>
                      5/7 - 7/7 -&gt; 7/7 - 9/7
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={0} style={gridItemStyle.gridItem3}>
                  <Box paddingLeft="10px">
                    <Typography
                      variant="h5"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      USER 1
                    </Typography>
                    <Divider width="200px" />
                    <Typography
                      variant="h6"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      DATE CHANGE
                      <span style={textBreakStyle}></span>
                      5/7 - 7/7 -&gt; 7/7 - 9/7
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={0} style={gridItemStyle.gridItem2}>
                  <Box paddingLeft="10px">
                    <Typography
                      variant="h5"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      USER 1
                    </Typography>
                    <Divider width="200px" />
                    <Typography
                      variant="h6"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      DATE CHANGE
                      <span style={textBreakStyle}></span>
                      5/7 - 7/7 -&gt; 7/7 - 9/7
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={0} style={gridItemStyle.gridItem3}>
                  <Box paddingLeft="10px">
                    <Typography
                      variant="h5"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      USER 1
                    </Typography>
                    <Divider width="200px" />
                    <Typography
                      variant="h6"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      DATE CHANGE
                      <span style={textBreakStyle}></span>
                      5/7 - 7/7 -&gt; 7/7 - 9/7
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={0} style={gridItemStyle.gridItem2}>
                  <Box paddingLeft="10px">
                    <Typography
                      variant="h5"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      USER 1
                    </Typography>
                    <Divider width="200px" />
                    <Typography
                      variant="h6"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      DATE CHANGE
                      <span style={textBreakStyle}></span>
                      5/7 - 7/7 -&gt; 7/7 - 9/7
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={0} style={gridItemStyle.gridItem3}>
                  <Box paddingLeft="10px">
                    <Typography
                      variant="h5"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      USER 1
                    </Typography>
                    <Divider width="200px" />
                    <Typography
                      variant="h6"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      DATE CHANGE
                      <span style={textBreakStyle}></span>
                      5/7 - 7/7 -&gt; 7/7 - 9/7
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={0} style={gridItemStyle.gridItem2}>
                  <Box paddingLeft="10px">
                    <Typography
                      variant="h5"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      USER 1
                    </Typography>
                    <Divider width="200px" />
                    <Typography
                      variant="h6"
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      DATE CHANGE
                      <span style={textBreakStyle}></span>
                      5/7 - 7/7 -&gt; 7/7 - 9/7
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
export default AdminDashboardRequest
