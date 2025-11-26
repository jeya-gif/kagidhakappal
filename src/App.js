import React, { useState, useEffect } from 'react';
import './App.css';
import IntroVideo from './components/IntroVideo';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Handle intro video end
  const handleIntroEnd = () => {
    setShowIntro(false);
  };

  // Smooth scroll CSS
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="App">
      {/* Show intro video on first load */}
      {showIntro ? (
        <IntroVideo onVideoEnd={handleIntroEnd} />
      ) : (
        <>
          {/* Main Website */}
          <Navbar />
          
          <div className="content-wrapper">
            <Home />
            <About />
            <Services />
            <Contact />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
