import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import IntroVideo from "./components/IntroVideo";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import OrderForm from "./components/OrderForm"; // <-- IMPORTANT

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroEnd = () => {
    setShowIntro(false);
  };

  // Smooth scroll CSS
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {/* INTRO VIDEO */}
        {showIntro ? (
          <IntroVideo onVideoEnd={handleIntroEnd} />
        ) : (
          <>
            <Navbar />

            <Routes>
              {/* MAIN ONE-PAGE WEBSITE */}
              <Route
                path="/"
                element={
                  <div className="content-wrapper">
                    <Home />
                    <About />
                    <Services />
                    <Contact />
                  </div>
                }
              />

              {/* SEPARATE ORDER FORM PAGE */}
              <Route path="/order" element={<OrderForm />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
