import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Box, Typography } from "@mui/material";

export default function AttendanceCalendar({ onDateChange }) {
  return (
    <Box
      sx={{
        width: "100%",
        "& .react-calendar": {
          border: "none",
          width: "100%",
          fontFamily: "Roboto, sans-serif",
          fontSize: "1rem",
          backgroundColor: "transparent",
        },
        "& .react-calendar__tile--now": {
          background: "#dbeafe !important",
          color: "#1e3a8a",
        },
        "& .react-calendar__tile--active": {
          background: "#3b82f6 !important",
          color: "#ffffff",
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
        Attendance Calendar
      </Typography>
      <Calendar
        onChange={(date) => onDateChange(date)}
        tileDisabled={({ date, view }) => view === 'month' && date > new Date()}
      />
    </Box>
  );
}
