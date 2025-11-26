import React, { useRef, useEffect } from 'react';
import './IntroVideo.css';

function IntroVideo({ onVideoEnd }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const handleVideoEnd = () => {
    // Call parent function when video ends
    onVideoEnd();
  };

  return (
    <div className="intro-video-container">
      <video
        ref={videoRef}
        className="intro-video"
        onEnded={handleVideoEnd}
        playsInline
        muted
      >
        <source src={`${process.env.PUBLIC_URL}/intro.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Optional: Skip button */}
      <button className="skip-button" onClick={onVideoEnd}>
        Skip Intro →
      </button>
    </div>
  );
}

export default IntroVideo;

