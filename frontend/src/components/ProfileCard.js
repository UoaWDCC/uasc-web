import { Avatar, CardContent, Stack, Button } from "@mui/material"
import React from "react"

import { Card, Typography } from "@mui/material"

const textType = "body1"

function ProfileCard() {
  return (
    <div style={{ width: "100%" }}>
      <Card
        sx={{
          boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.14)",
          backgroundColor: "white",
          borderRadius: "15px",
        }}
      >
        <CardContent sx={{ padding: "36px" }}>
          <Stack spacing={2}>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center">
                <Avatar sx={{ minWidth: "100px", minHeight: "100px" }} />
                <Typography variant="h6" sx={{ marginLeft: "32px" }}>
                  John Doe
                </Typography>
              </Stack>
              <Button
                variant="contained"
                color="buttonPrimary"
                size="small"
                sx={{ borderRadius: "100px", paddingX: "24px" }}
              >
                {" "}
                Edit{" "}
              </Button>
            </Stack>
            <Stack align="left">
              <Stack direction="row">
                <Typography
                  variant={textType}
                  sx={{
                    minWidth: "160px",
                  }}
                >
                  Phone
                </Typography>
                <Typography
                  variant={textType}
                  sx={{
                    minWidth: "300px",
                  }}
                >
                  +64 2400 400 422
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography
                  variant={textType}
                  sx={{
                    minWidth: "160px",
                  }}
                >
                  Email
                </Typography>
                <Typography
                  variant={textType}
                  sx={{
                    minWidth: "300px",
                  }}
                >
                  Johndoe@gmail.com
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography
                  variant={textType}
                  sx={{
                    minWidth: "160px",
                  }}
                >
                  Membership
                </Typography>
                <Typography
                  variant={textType}
                  sx={{
                    minWidth: "300px",
                  }}
                >
                  UoA Student
                </Typography>
              </Stack>
            </Stack>
            <Stack>
              <Typography variant={textType}>Other Details</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileCard
