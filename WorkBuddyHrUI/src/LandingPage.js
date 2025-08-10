import React from "react";
import { Box, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import BannerImage from "./images/BackgroundMenu.png";

const LandingContainer = styled(Box)({
  minHeight: "98vh",
  // width: "100%",
  height: "80%",
  backgroundImage: `url(${BannerImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  // backgroundRepeat: "no-repeat",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "#fff",
  // position: "relative",
  // padding: "2rem",
});

// Sign In button styling at top right
const SignInButton = styled(Button)({
  position: "absolute",
  top: "20px",
  right: "20px",
  borderRadius: "2rem",
  fontWeight: 600,
  textTransform: "none",
  background: "linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(90deg, #4f46e5 0%, #2563eb 100%)",
  },
});

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <LandingContainer>
      <SignInButton variant="contained" onClick={() => navigate("/login")}>
        Sign In
      </SignInButton>

      <Box sx={{ maxWidth: "800px", mx: "auto", textAlign: "center" }}>
        <Typography variant="h2" fontWeight={700} gutterBottom>
          Welcome to Work Buddy
        </Typography>
        <Typography variant="h5">
          Manage attendance, leave and payroll with ease. Your all-in-one HR solution.
        </Typography>
      </Box>
    </LandingContainer>
  );
}
