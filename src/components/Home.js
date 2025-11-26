import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../Boat.json'; // Your Lottie file
import './Home.css';

function Home() {
  return (
    <section id="home" className="home-section">
      <div className="home-content">
        {/* Left Side - Text */}
        <div className="home-text">
          <h1 className="home-title">KAGIDHA KAPPAL</h1>
          <p className="home-subtitle">Fold your dreams. Make them Float</p>
        </div>

        {/* Right Side - Lottie Animation */}
        <div className="home-animation">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
