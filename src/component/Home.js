import React, { useRef, useState } from "react";
import { Card, CardContent, Button, Box } from "@mui/material";

const styles = {
  card: {
    maxWidth: "90vmin",
    position: "absolute",
    borderRadius: 20,
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    padding: "60px 80px",
    boxShadow: "0 20px 60px rgba(4, 0, 0, 0.5)",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submitBtn: {
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

const Home = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const [show, setShow] = useState(true);

  const handleVideoUpload = (event) => {
    const video = videoRef.current;
    const file = event.target.files[0];

    if (file) {
      const videoURL = URL.createObjectURL(file);
      video.src = videoURL;
      setShow(false);
    }
  };

  return (
    <>
      <Card sx={styles.card}>
        <CardContent>
          <input
            type="file"
            onChange={handleVideoUpload}
            accept="video/*"
            style={styles.input}
          />
          <video
            ref={videoRef}
            controls
            width="100%"
            height="80%"
            style={{ marginTop: 20, display: "none" }}
          />
          <Button
            variant="contained"
            className="history-btn"
            sx={styles.submitBtn}>
            Submit
          </Button>
        </CardContent>
      </Card>
      <Box>
        {/* <video
          ref={videoRef}
          controls
          width="640"
          height="480"
          className="video-player"
        /> */}
        {/* <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="face-canvas"
        />
        <canvas
          ref={overlayRef}
          width="640"
          height="480"
          className="face-canvasOverlay"
        /> */}
      </Box>
    </>
  );
};

export default Home;
