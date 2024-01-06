// VideoPlayer.js
import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import { fabric } from "fabric";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const setupFaceDetection = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      video.addEventListener("play", async () => {
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors();
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
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
    }
  };

  const handlePlayPause = () => {
    const video = videoRef.current;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="video-player-container">
      <input type="file" onChange={handleVideoUpload} accept="video/*" />
      <video
        ref={videoRef}
        controls
        width="640"
        height="480"
        className="video-player"
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        className="face-canvas"
      />
      <button onClick={handlePlayPause}>Play/Pause</button>
    </div>
  );
};

export default VideoPlayer;
