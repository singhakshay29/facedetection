import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../assets/logo.png";
import { Box, Button } from "@mui/material";

const styles = {
  container: {
    display: "flex",
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
    color: "black",
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
    <AppBar style={{ background: "transparent", position: "fixed" }}>
      <Container maxWidth="xl" style={{ backgroundColor: "transparent" }}>
        <Toolbar disableGutters>
          <Container className="display" sx={styles.container}>
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
              <Button className="history-btn" sx={styles.historyBtn}>
                History
              </Button>
            </Box>
          </Container>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
