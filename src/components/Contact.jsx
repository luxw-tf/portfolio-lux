import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaXTwitter, FaLinkedin, FaFileLines, FaEnvelope } from 'react-icons/fa6';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-link', 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">contact</h2>
        
        <div className="contact-grid">
          <a href="https://github.com/luxw-tf" target="_blank" rel="noreferrer" className="contact-link" aria-label="github">
            <FaGithub size={48} className="contact-icon" />
            <span>github</span>
          </a>
          
          <a href="https://x.com/luxw_tf" target="_blank" rel="noreferrer" className="contact-link" aria-label="x (twitter)">
            <FaXTwitter size={48} className="contact-icon" />
            <span>x (twitter)</span>
          </a>
          
          <a href="https://www.linkedin.com/in/vedant-sanodiya-6ab79133a" target="_blank" rel="noreferrer" className="contact-link" aria-label="linkedin">
            <FaLinkedin size={48} className="contact-icon" />
            <span>linkedin</span>
          </a>
          
          <a href="https://drive.google.com/file/d/1MUHPztvlOhV9UMEjrUkF50wE_kv7qWAK/view?usp=sharing" target="_blank" rel="noreferrer" className="contact-link" aria-label="resume">
            <FaFileLines size={48} className="contact-icon" />
            <span>resume</span>
          </a>
          
          <a href="mailto:stevefrmspace@gmail.com" className="contact-link" aria-label="email">
            <FaEnvelope size={48} className="contact-icon" />
            <span>email</span>
          </a>
        </div>
        
        <div className="contact-footer">
          <p>available for creator ops, community, and content work.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
