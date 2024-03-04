import { Grid, Typography, Box, Divider, Paper } from "@mui/material"

const RequestBlock = ({ requestData, setSelectedUser }: any) => {
  const gridItemStyle = {
    gridItem: {
      borderRadius: 15, // Change the value as needed
      padding: "5px", // Add padding as needed
      boxShadow: "none",
      marginBottom: "5px"
    }
  }

  const textBreakStyle = {
    display: "block",
    marginBottom: -6
  }

  const backgroundColor =
    requestData.query_type === "cancellation" ? "pink" : "lightblue"
  return (
    <Grid item xs={12} onClick={() => setSelectedUser(requestData.booking_id)}>
      <Paper
        elevation={0}
        style={{ ...gridItemStyle.gridItem, backgroundColor }}
      >
        <Box paddingLeft="10px">
          <Typography variant="h5" align="left" sx={{ fontWeight: "bold" }}>
            {requestData.user_id}
          </Typography>
          <Divider />
          <Typography
            variant="h6"
            align="left"
            sx={{ fontWeight: "bold" }}
            textTransform="uppercase"
          >
            {requestData.query_type === "cancellation"
              ? "cancellation"
              : "date change"}
            <span style={textBreakStyle}></span>
            5/7 - 7/7 -&gt; 7/7 - 9/7
          </Typography>
        </Box>
      </Paper>
    </Grid>
  )
}
export default RequestBlock
