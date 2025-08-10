import React, { useState } from "react";
import {
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Tooltip,
  Paper,
} from "@mui/material";
import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";
import Background from "./images/Background.png";
import AttendanceCalendar from "./AttendanceCalendar";
import CheckInOutForm from "./CheckInOutForm";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const FullScreenBox = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  padding: "2rem",
  boxSizing: "border-box",
});

const StyledContainer = styled(Box)({
  width: "100%",
  maxWidth: 1400,
  minHeight: 400,
  padding: "2rem",
  borderRadius: "1.5rem",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.1)",
  display: "flex",
  alignItems: "flex-start",
  gap: "2rem",
  position: "relative",
});

const Sidebar = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: 260,
    backgroundColor: "#f9fafb",
    borderRight: "1px solid #e0e0e0",
    borderRadius: "0 16px 16px 0",
    boxShadow: "4px 0px 12px rgba(0, 0, 0, 0.05)",
  },
});

const ToggleButton = styled(IconButton)({
  position: "fixed",
  top: 24,
  left: 24,
  zIndex: 1300,
  background: "#ffffffdd",
  backdropFilter: "blur(4px)",
  border: "1px solid #e2e8f0",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  "&:hover": {
    background: "#ffffffee",
  },
});

export default function MenuPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("Welcome to Smart Office");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthlyLogs, setMonthlyLogs] = useState({});

  const handleMenuClick = (content) => {
    setSelectedContent(content);
    setDrawerOpen(false);
  };

  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const monthDays = [...Array(daysInMonth)].map((_, i) => {
    const dayDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1);
    const dayKey = dayDate.toISOString().slice(0, 10);
    const entries = monthlyLogs[dayKey] || [];

    const totalMinutes = entries.reduce((sum, entry) => {
      if (!entry.checkIn || !entry.checkOut) return sum;
      const [inH, inM] = entry.checkIn.split(":").map(Number);
      const [outH, outM] = entry.checkOut.split(":").map(Number);

      const checkIn = new Date(dayDate);
      checkIn.setHours(inH, inM, 0, 0);

      const checkOut = new Date(dayDate);
      checkOut.setHours(outH, outM, 0, 0);

      const diffMs = checkOut - checkIn;
      const diffMins = Math.max(0, Math.floor(diffMs / 60000));
      return sum + diffMins;
    }, 0);

    return {
      date: i + 1,
      hours: Number((totalMinutes / 60).toFixed(2)),
    };
  });

  const workedDays = monthDays.filter((d) => d.hours > 0).length;
  const totalWorkedHours = monthDays.reduce((sum, d) => sum + d.hours, 0);
  const avgHoursPerDay = workedDays > 0 ? (totalWorkedHours / workedDays).toFixed(1) : 0;

  const totalWorkedMinutes = totalWorkedHours * 60;
  const totalPossibleMinutes = daysInMonth * 24 * 60;
  const totalRemainingMinutes = Math.max(0, totalPossibleMinutes - totalWorkedMinutes);
  const pieData = [
    { name: "Worked Hours", value: totalWorkedMinutes / 60 },
    { name: "Remaining Hours", value: totalRemainingMinutes / 60 },
  ];
  const COLORS = ["#1976d2", "#e0e0e0"];

  return (
    <FullScreenBox>
      {!drawerOpen && (
        <Tooltip title="Open Menu" arrow>
          <ToggleButton onClick={() => setDrawerOpen(true)} size="large" aria-label="Open Menu">
            <MenuIcon />
          </ToggleButton>
        </Tooltip>
      )}

      <Sidebar
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box>
          <Typography variant="h6" sx={{ p: 2, fontWeight: 600 }}>
            Menu
          </Typography>
          <Divider />
          <List disablePadding>
            <ListItemButton onClick={() => handleMenuClick("Attendance")}>
              <ListItemText primary="Attendance" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick("Leave")}>
              <ListItemText primary="Leave" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick("Payroll")}>
              <ListItemText primary="Payroll" />
            </ListItemButton>
          </List>
        </Box>
      </Sidebar>

      <StyledContainer>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            mb={2}
            sx={{ letterSpacing: "0.5px" }}
          >
            {selectedContent}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {selectedContent === "Attendance" ? (
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {/* Left: Calendar + Summary + Graph */}
              <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
                <AttendanceCalendar onDateChange={setSelectedDate} />

                <Paper elevation={3} sx={{ p: 3, borderRadius: "1rem", bgcolor: "#f8fafc", flex: 1 }}>
                  <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                    <Paper elevation={1} sx={{ flex: 1, p: 1.5, textAlign: "center", bgcolor: "#ffffff" }}>
                      <Typography variant="subtitle2" color="text.secondary">Worked Days</Typography>
                      <Typography variant="h6" color="primary">{workedDays}</Typography>
                    </Paper>
                    <Paper elevation={1} sx={{ flex: 1, p: 1.5, textAlign: "center", bgcolor: "#ffffff" }}>
                      <Typography variant="subtitle2" color="text.secondary">Total Hours</Typography>
                      <Typography variant="h6" color="primary">{totalWorkedHours.toFixed(1)}h</Typography>
                    </Paper>
                    <Paper elevation={1} sx={{ flex: 1, p: 1.5, textAlign: "center", bgcolor: "#ffffff" }}>
                      <Typography variant="subtitle2" color="text.secondary">Avg Hours/Day</Typography>
                      <Typography variant="h6" color="primary">{avgHoursPerDay}h</Typography>
                    </Paper>
                  </Box>

                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Monthly Attendance Overview
                  </Typography>
                  <ResponsiveContainer height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, value }) => `${name}: ${value.toFixed(1)}h`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Box>

              {/* Right: Check In/Out */}
              <Box sx={{ flex: 1, minWidth: 300 }}>
                <CheckInOutForm
                  selectedDate={selectedDate}
                  monthlyLogs={monthlyLogs}
                  setMonthlyLogs={setMonthlyLogs}
                />
              </Box>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.6 }}>
              You have selected <strong>{selectedContent}</strong>. Replace this section with
              dynamic page content or components related to the selected feature.
            </Typography>
          )}
        </Box>
      </StyledContainer>
    </FullScreenBox>
  );
}
