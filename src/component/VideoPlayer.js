// VideoPlayer.js
import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import { fabric } from "fabric";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const setupFaceDetection = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

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
            .withFaceDescriptors();
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
      <canvas
        ref={overlayRef}
        width="640"
        height="480"
        className="face-canvasOverlay"
      />
      <button onClick={handlePlayPause}>Play/Pause</button>
    </div>
  );
};

export default VideoPlayer;
