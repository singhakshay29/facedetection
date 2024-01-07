import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import qR from "../assets/qR.png";

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
    fontWeight: 700,
    marginTop: "1rem",
    color: "#7D40FF",
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
      backgroundColor: "#333",
    },
  },
};

export default function NavBar() {
  return (
    <AppBar style={{ background: "#8b50fe", position: "fixed" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Container sx={styles.container}>
            <Box>
              <img
                src={qR}
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
