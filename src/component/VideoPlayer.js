import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { fabric } from "fabric";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const styles = {
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
  uploadLabel: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Ubuntu, sans-serif",
    boxShadow: "0 20px 60px rgba(4, 0, 0, 0.5)",
  },
  videoPlayerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  greenMessage: {
    color: "#00FEFB",
    fontFamily: "Ubuntu, sans-serif",
    marginTop: "3rem",
  },
};
const VideoPlayer = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const [show, setShow] = useState("none");
  const [showbtn, setShowbtn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [showUploadMessage, setShowUploadMessage] = useState(false);

  const handleShowVideo = () => {
    if (!fileUploaded) {
      return;
    }
    if (show === "none") {
      setShow("flex");
      setShowbtn(true);
    } else {
      setShow("none");
      setShowbtn(false);
    }
  };
  useEffect(() => {
    const setupFaceDetection = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.ageGenderNet.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const overlayCanvas = overlayRef.current;
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);
      faceapi.matchDimensions(overlayCanvas, displaySize);

      video.addEventListener("play", async () => {
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);
        faceapi.matchDimensions(overlayCanvas, displaySize);

        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors()
            .withFaceExpressions()
            .withAgeAndGender();
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          if (!overlayCanvas.__fabric) {
            overlayCanvas.__fabric = new fabric.Canvas(overlayCanvas);
          }
          overlayCanvas.__fabric.clear();

          resizedDetections.forEach((detection) => {
            const box = detection.detection.box;
            const rect = new fabric.Rect({
              left: box.x,
              top: box.y,
              width: box.width,
              height: box.height,
              fill: "transparent",
              stroke: "red",
              strokeWidth: 2,
            });
            overlayCanvas.__fabric.add(rect);
          });
          overlayCanvas.__fabric.renderAll();
        }, 100);
      });
    };

    setupFaceDetection();
  }, []);

  const handleVideoUpload = (event) => {
    const video = videoRef.current;
    const file = event.target.files[0];

    if (file) {
      const videoURL = URL.createObjectURL(file);
      video.src = videoURL;
      setFileUploaded(true);
      setShowUploadMessage(true);
    }
  };
  const handlePlayPause = () => {
    const video = videoRef.current;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div className="video-player-container">
        <label htmlFor="uploadFile" style={styles.uploadLabel}>
          <CloudUploadIcon style={{ fontSize: "40px" }} />
          Upload Video
          <input
            id="uploadFile"
            type="file"
            style={{ visibility: "hidden" }}
            onChange={handleVideoUpload}
            accept="video/*"
          />
        </label>
        <video
          ref={videoRef}
          width="640"
          height="480"
          className="video-player"
          style={{ display: show }}
        />
        <canvas
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
        />
        {showUploadMessage && fileUploaded && (
          <div style={styles.greenMessage}>Video uploaded successfully!</div>
        )}
        {!showbtn && (
          <>
            <Button onClick={handleShowVideo} sx={styles.historyBtn}>
              Submit
            </Button>
          </>
        )}
        {showbtn && (
          <Button onClick={handlePlayPause} sx={styles.historyBtn}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
        )}
      </div>
    </>
  );
};

export default VideoPlayer;
