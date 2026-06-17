import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import SelectedWork from './components/SelectedWork';
import Wins from './components/Wins';
import ExperienceJourney from './components/ExperienceJourney';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      <Hero />
      <SelectedWork />
      <Wins />
      <ExperienceJourney />
      <About />
      <Contact />
    </div>
  );
}

export default App;
