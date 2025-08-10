import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Paper, List, ListItem, ListItemText, Divider, CircularProgress } from "@mui/material";
import axios from "axios";

export default function CheckInOutForm({ selectedDate, monthlyLogs, setMonthlyLogs, employeeId = 1 }) {
  const [currentSession, setCurrentSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const dateKey = selectedDate.toISOString().slice(0, 10);

  useEffect(() => {
    const todayLogs = monthlyLogs[dateKey] || [];
    const lastSession = todayLogs[todayLogs.length - 1];
    if (lastSession && !lastSession.checkOut) {
      setCurrentSession("in");
    } else {
      setCurrentSession("out");
    }
  }, [monthlyLogs, dateKey]);

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:8081/attendance/${employeeId}/checkin`);
      const checkInTime = new Date().toTimeString().slice(0, 5);

      const newSession = { checkIn: checkInTime, checkOut: null };
      const updatedLogs = { ...monthlyLogs, [dateKey]: [...(monthlyLogs[dateKey] || []), newSession] };
      setMonthlyLogs(updatedLogs);
      setCurrentSession("in");
    } catch (error) {
      console.error("Check-in failed", error);
      alert("Check-in failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:8081/attendance/1/checkout`);
      const checkOutTime = new Date().toTimeString().slice(0, 5);

      const todayLogs = monthlyLogs[dateKey] || [];
      const updatedLogs = [...todayLogs];
      const lastSessionIndex = updatedLogs.findIndex((s) => !s.checkOut);

      if (lastSessionIndex !== -1) {
        updatedLogs[lastSessionIndex].checkOut = checkOutTime;
        setMonthlyLogs({ ...monthlyLogs, [dateKey]: updatedLogs });
      }
      setCurrentSession("out");
    } catch (error) {
      console.error("Check-out failed", error);
      alert("Check-out failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const logs = monthlyLogs[dateKey] || [];

  return (
    <Paper elevation={3} sx={{ p: 3, height: "100%", bgcolor: "#f8fafc" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Check In/Out - {selectedDate.toDateString()}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {currentSession === "out" && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCheckIn}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Check In"}
          </Button>
        )}
        {currentSession === "in" && (
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleCheckOut}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Check Out"}
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Today's Sessions
      </Typography>

      <List dense>
        {logs.length === 0 ? (
          <ListItem>
            <ListItemText primary="No records yet." />
          </ListItem>
        ) : (
          logs.map((log, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={`Session ${i + 1}`}
                secondary={`Check-in: ${log.checkIn || "--:--"} | Check-out: ${log.checkOut || "--:--"}`}
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
}
