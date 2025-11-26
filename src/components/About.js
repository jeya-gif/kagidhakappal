import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container fade-up">
        <h2 className="section-title glow-text">About Us</h2>

        <div className="about-content slide-up">
          <p>
            <strong>KAGIDHA KAPPAL</strong> is a student-project-based creative foundation where ideas,
            imagination, and skills set sail. Built with passion and purpose, our startup is focused on
            helping students explore creativity, design, innovation, and hands-on learning.
          </p>

          <p>
            What began as a simple concept — <em>turning thoughts into creations</em> — has now grown into a
            movement that encourages young minds to experiment, build, and express themselves through
            modern digital skills, artistic thinking, and real-world projects.
          </p>

          <p>
            At <strong>KAGIDHA KAPPAL</strong>, we believe that every idea, just like a folded paper boat,
            carries the power to travel far. We provide a space where students can develop creativity,
            learn new technologies, strengthen design abilities, and turn imagination into meaningful
            work.
          </p>

          <p>
            Our mission is simple: <strong className="highlight">To inspire students to create, design,
            innovate, and dream without limits.</strong> We bridge creativity with skill development,
            helping learners shape a future filled with confidence and originality.
          </p>

          <p className="final-line fade-glow">
            Join us — let your ideas float, fly, and become something extraordinary.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
