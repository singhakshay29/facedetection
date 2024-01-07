import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../assets/logo.png";
import { Box } from "@mui/material";

const styles = {
  container: {
    display: "flex",
    zIndex: 1000,
    justifyContent: "space-between",
  },
  logo: {
    height: 80,
    borderRadius: 10,
  },
  title: {
    fontFamily: "Ubuntu",
    fontWeight: 700,
    marginTop: "1rem",
    color: "#00FEFB",
    textDecoration: "none",
  },
  historyBtn: {
    width: 150,
    height: 40,
    marginTop: "1rem",
    cursor: "pointer",
    borderRadius: 10,
    backgroundColor: "transparent",
    fontFamily: "Ubuntu, sans-serif",
    boxShadow: "0 20px 60px rgba(4, 0, 0, 0.5)",
    color: "black",
    "&:hover": {
      backgroundColor: "#333", // Change to the desired dark color on hover
    },
  },
};

export default function NavBar() {
  return (
    <AppBar style={{ background: "black", position: "fixed" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Container sx={styles.container}>
            <Box>
              <img
                src={logo}
                className="logo"
                alt="amazon music"
                style={styles.logo}
              />
            </Box>
            <Box>
              <Typography variant="h3" noWrap sx={styles.title}>
                Face Detection
              </Typography>
            </Box>
            <Box>
              <img
                src={logo}
                className="logo"
                alt="amazon music"
                style={styles.logo}
              />
            </Box>
          </Container>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
