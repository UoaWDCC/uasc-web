import { Card, Typography, CardContent, Stack, Box } from "@mui/material"
import React from "react"
import { DateCalendar, PickersDay } from "@mui/x-date-pickers"
import { styled } from "@mui/material/styles"

const StyledCalendarDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isBookedDate",
})(
  /**
   * @param {{isBookedDate: boolean}}
   */
  ({ theme, isBookedDate }: any) => ({
    ...(isBookedDate && {
      backgroundColor: theme.palette.primary[theme.palette.mode],
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary[theme.palette.mode],
      },
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),
  })
)

function CalendarDay(props: any) {
  const { bookings, ...others } = props

  const isBookedDate = bookings.some((booking: any) => {
    const start = booking.data().check_in.toDate()
    const end = booking.data().check_out.toDate()

    const calendarDate = others.day.toDate()

    return start <= calendarDate && end >= calendarDate
  })

  return <StyledCalendarDay {...others} isBookedDate={isBookedDate} />
}

/**
 * @param {{bookings: Array<Booking>}}
 */
function ProfileCalendarCard({ bookings }: any) {
  // construct all the dates

  return (
    <div>
      <Card
        sx={{
          boxShadow: "0px 8px 44px 0px rgba(0, 0, 0, 0.14)",
          backgroundColor: "white",
          borderRadius: "15px",
        }}
      >
        <CardContent sx={{ padding: "36px" }}>
          <Stack spacing={2}>
            <Typography
              variant="h5"
              align="left"
              color="#457CC3"
              sx={{ fontWeight: "900" }}
            >
              Calendar
            </Typography>
            <Box>
              <DateCalendar
                readOnly
                loading={bookings === undefined}
                slots={{ day: CalendarDay }}
                slotProps={{
                  // @ts-ignore
                  day: () => ({
                    bookings,
                  }),
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileCalendarCard
