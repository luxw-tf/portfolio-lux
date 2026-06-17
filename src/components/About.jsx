import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.about-line');
      
      gsap.fromTo(lines, 
        { y: 30, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          }
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section">
      <div className="container">
        <div className="about-content" ref={textRef}>
          <p className="about-line">
            i'm a web3 creative focused on creator operations, content, and community.
          </p>
          <p className="about-line">
            over the last few years i've built communities, managed creators, run campaigns, and created content for internet-native brands.
          </p>
          <p className="about-line">
            i enjoy building systems that help creators, communities, and content work together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
