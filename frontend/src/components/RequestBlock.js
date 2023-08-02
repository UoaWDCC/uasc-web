import { Grid, Typography, Box, Divider, Paper } from "@mui/material"

const RequestBlock = ({ requestData, counter }) => {
  const gridItemStyle = {
    gridItem2: {
      borderRadius: 15, // Change the value as needed
      padding: "5px", // Add padding as needed
      boxShadow: "none",
      marginBottom: "5px",
    },
    gridItem3: {
      borderRadius: 15, // Change the value as needed
      padding: "5px", // Add padding as needed
      boxShadow: "none",
      marginBottom: "5px",
    },
  }

  const textBreakStyle = {
    display: "block",
    marginBottom: -6,
  }

  const backgroundColor = counter % 2 === 0 ? "pink" : "lightblue"

  return (
    <Grid item xs={12}>
      <Paper
        elevation={0}
        style={{ ...gridItemStyle.gridItem2, backgroundColor }}
      >
        <Box paddingLeft="10px">
          <Typography variant="h5" align="left" sx={{ fontWeight: "bold" }}>
            {requestData.user_id}
          </Typography>
          <Divider width="200px" />
          <Typography
            variant="h6"
            align="left"
            sx={{ fontWeight: "bold" }}
            textTransform="uppercase"
          >
            DATE CHANGE
            <span style={textBreakStyle}></span>
            5/7 - 7/7 -&gt; 7/7 - 9/7
          </Typography>
        </Box>
      </Paper>
    </Grid>
  )
}
export default RequestBlock
