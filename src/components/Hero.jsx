import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaGithub, FaXTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa6';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-text', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo('.hero-links a', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.8 }
      );

      // Setup cursor follow for profile picture
      gsap.set(imgRef.current, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.8 });
      
      const xTo = gsap.quickTo(imgRef.current, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(imgRef.current, "y", { duration: 0.6, ease: "power3" });
      
      const handleMouseMove = (e) => {
        const rect = heroRef.current.getBoundingClientRect();
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      };

      const handleMouseEnter = () => {
        gsap.to(imgRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
      };

      const handleMouseLeave = () => {
        gsap.to(imgRef.current, { opacity: 0, scale: 0.8, duration: 0.5, ease: "power2.in" });
      };

      const section = heroRef.current;
      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseenter", handleMouseEnter);
      section.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseenter", handleMouseEnter);
        section.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  const handleThemeToggle = (e) => {
    // Make sure we only toggle if clicking the section background, not the links
    if (e.target.closest('a')) return;

    const section = heroRef.current;
    const isGoingDark = section.classList.contains('light-theme');

    if (!document.startViewTransition) {
      section.classList.toggle('light-theme');
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    if (isGoingDark) {
      document.documentElement.classList.add('transitioning-to-dark');
    }

    const transition = document.startViewTransition(() => {
      section.classList.toggle('light-theme');
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      document.documentElement.animate(
        {
          clipPath: isGoingDark ? [...clipPath].reverse() : clipPath
        },
        {
          duration: 600,
          easing: 'ease-in-out',
          fill: 'forwards',
          pseudoElement: isGoingDark 
            ? '::view-transition-old(root)' 
            : '::view-transition-new(root)'
        }
      );
    });

    transition.finished.then(() => {
      document.documentElement.classList.remove('transitioning-to-dark');
    });
  };

  return (
    <section className="hero-section" ref={heroRef} onClick={handleThemeToggle} style={{ cursor: 'pointer' }}>
      <div className="container hero-container" style={{ pointerEvents: 'none' }}>
        <div className="hero-top" style={{ pointerEvents: 'auto' }}>
          <h1 className="hero-text headline">hey, i'm lux</h1>
        </div>
        <img src="/images/profile.jpg" alt="lux" className="hero-img profile-pic" ref={imgRef} />
        
        <div className="hero-content" style={{ pointerEvents: 'auto' }}>
          <p className="hero-text sub-headline">
            i help internet-native brands grow through content, creators, and community.
          </p>
          
          <div className="hero-text currently-wrapper">
            <h3 className="currently-title">currently</h3>
            <ul className="currently-list">
              <li>content @ p2p.me</li>
              <li>creator ops @ sherpa by mudrex</li>
            </ul>
          </div>
          
          <div className="hero-links">
            <a href="https://x.com/luxw_tf" target="_blank" rel="noreferrer" className="wide-btn" aria-label="x (twitter)">
              <FaXTwitter /> follow me on x
            </a>
            <a href="mailto:stevefrmspace@gmail.com" className="icon-btn" aria-label="email">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
