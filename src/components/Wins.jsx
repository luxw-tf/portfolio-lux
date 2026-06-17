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
    embed: (
      <iframe
        src="https://player.mux.com/Kbzcnfs00k8eLy11mveZUsc8601XXkEj01ZhLhj9M01wenk?poster_time=0"
        style={{ width: "100%", height: "100%", border: "none", aspectRatio: "16/9" }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      ></iframe>
    )
  },
  {
    id: 2,
    title: "tigergraph content bounty winner",
    description: "won a content bounty by creating a campaign video for tigergraph.",
    link: "https://x.com/luxw_tf/status/2052091910907691275",
    embed: (
      <iframe
        src="https://player.mux.com/BiiTq00hJaiKLT00RoBHWHROHtkuijje16q9xwCZN47Dw?poster_time=0"
        style={{ width: "100%", height: "100%", border: "none", aspectRatio: "16/9" }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      ></iframe>
    )
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
                {win.embed ? (
                  win.embed
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
