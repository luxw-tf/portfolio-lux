import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ExperienceJourney.css';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    id: 1,
    year: "2023 — present",
    company: "builderbase",
    role: "community lead & content strategist",
    logo: "/images/bb.png",
    description: "scaled a web3 developer community from 6 founding members into a nationwide network. led community growth, content strategy, outreach, events, and ecosystem partnerships."
  },
  {
    id: 2,
    year: "2026 — present",
    company: "sherpa by mudrex",
    role: "creator operations",
    logo: "/images/mudrex.png",
    description: "lead creator initiatives inside mudrex's ambassador program. recruit creators, coordinate campaigns, manage creator relationships, and build content systems that drive community engagement."
  },
  {
    id: 3,
    year: "2026 — present",
    company: "p2p",
    role: "content creator",
    logo: "/images/p2p.png",
    description: "built content for staking and trading campaigns, creating video scripts, social copy, and campaign messaging tailored for local audiences."
  }
];

const ExperienceJourney = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.timeline-entry');
      items.forEach((item, i) => {
        gsap.fromTo(item, 
          { y: 60, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="experience-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">experience</h2>
        
        <div className="timeline">
          {experienceData.map((exp) => (
            <div className="timeline-entry" key={exp.id}>
              <div className="timeline-marker"></div>
              
              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="logo-wrapper">
                    <img src={exp.logo} alt={exp.company} className="company-logo" />
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-year">{exp.year}</span>
                    <h3 className="timeline-company">{exp.company}</h3>
                    <h4 className="timeline-role">{exp.role}</h4>
                  </div>
                </div>
                
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceJourney;
