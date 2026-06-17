import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Trophy } from 'lucide-react';
import './Wins.css';

gsap.registerPlugin(ScrollTrigger);

const winsData = [
  {
    id: 1,
    title: "superteam coldstar bounty winner",
    description: "won a superteam bounty by creating a campaign video for coldstar.",
    link: "https://x.com/luxw_tf/status/2047013924521001152",
    image: "/images/coldstar.png"
  },
  {
    id: 2,
    title: "tigergraph content bounty winner",
    description: "won a content bounty by creating a campaign video for tigergraph.",
    link: "https://x.com/luxw_tf/status/2052091910907691275",
    image: "/images/tigergraph.jpg"
  }
];

const Wins = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.win-card', 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="wins-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">content bounty wins</h2>
        
        <div className="wins-grid">
          {winsData.map((win) => (
            <a href={win.link} target="_blank" rel="noreferrer" className="win-card" key={win.id}>
              <div className="win-media">
                {win.image ? (
                  <img src={win.image} alt={win.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Trophy size={48} className="win-icon" />
                )}
              </div>
              <div className="win-content">
                <h3 className="win-title">{win.title}</h3>
                <p className="win-desc">{win.description}</p>
                <div className="win-link">
                  <span>view post</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wins;
