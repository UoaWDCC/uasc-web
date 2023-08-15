import {
  Card,
  Typography,
  Avatar,
  CardContent,
  Stack,
  Button,
} from "@mui/material"
import React from "react"
import { useState } from "react"

const textType = "body1"

function ProfileCard() {
  const [expanded, setExpanded] = useState(false)

  //Expanding the more details on the user page
  const expandDetails = () => {
    setExpanded(!expanded)
  }

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
                <Typography variant="h4" sx={{ marginLeft: "32px" }}>
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
            <Stack align="left" spacing={1}>
              <Stack direction="row">
                <Typography
                  variant={textType}
                  color="#787B7D"
                  sx={{
                    minWidth: "25%",
                    maxWidth: "25%",
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
                  color="#787B7D"
                  sx={{
                    minWidth: "25%",
                    maxWidth: "25%",
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
                  color="#787B7D"
                  sx={{
                    minWidth: "25%",
                    maxWidth: "25%",
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
              {expanded ? (
                <Stack spacing={1} align="left">
                  <Stack direction="row">
                    <Typography
                      variant={textType}
                      color="#787B7D"
                      sx={{
                        minWidth: "25%",
                        maxWidth: "25%",
                      }}
                    >
                      Emergency Contact Name
                    </Typography>
                    <Typography
                      variant={textType}
                      sx={{
                        minWidth: "300px",
                      }}
                    >
                      Jane Doe
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography
                      variant={textType}
                      color="#787B7D"
                      sx={{
                        minWidth: "25%",
                        maxWidth: "25%",
                      }}
                    >
                      Emergency Contact Number
                    </Typography>
                    <Typography
                      variant={textType}
                      sx={{
                        minWidth: "300px",
                      }}
                    >
                      +64 2400 420 422
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography
                      variant={textType}
                      color="#787B7D"
                      sx={{
                        minWidth: "25%",
                        maxWidth: "25%",
                      }}
                    >
                      Emergency Contact Relation
                    </Typography>
                    <Typography
                      variant={textType}
                      sx={{
                        minWidth: "300px",
                      }}
                    >
                      Mother
                    </Typography>
                  </Stack>
                </Stack>
              ) : (
                <div></div>
              )}
              <Typography
                variant={textType}
                color="#787B7D"
                onClick={expandDetails}
              >
                {expanded ? "Hide Details" : "More Details"}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileCard
