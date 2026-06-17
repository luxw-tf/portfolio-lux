import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, ExternalLink, Video } from 'lucide-react';
import './SelectedWork.css';

const projects = [
  {
    id: 1,
    title: "how do transaction limits work on p2p",
    description: "everyone's asking why their p2p limit is so low. nobody's talking about this.",
    link: "https://x.com/luxw_tf/status/2065308789566484729",
    embed: (
      <iframe
        src="https://player.mux.com/p6MDy7zPJj3GPnDcx3Fe2mx1kqGIFE02SiYhixoxkzSU?poster=https%3A%2F%2Fimage.mux.com%2Fp6MDy7zPJj3GPnDcx3Fe2mx1kqGIFE02SiYhixoxkzSU%2Fthumbnail.png%3Ftime%3D0&autoplay=true&muted=true"
        style={{ width: "100%", height: "100%", border: "none", aspectRatio: "16/9" }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      ></iframe>
    )
  },
  {
    id: 2,
    title: "how to actually buy crypto without being scammed",
    description: "a tutorial for crypto newcomers to buy tokens frm p2p.me",
    link: "https://x.com/luxw_tf/status/2062493646143033706",
    embed: (
      <iframe
        src="https://player.mux.com/y02evHKGyEkW9yQSMBpvRZIBsT6yTiiTbZjS13JKe4jQ?poster_time=0&autoplay=true&muted=true"
        style={{ width: "100%", height: "100%", border: "none", aspectRatio: "16/9" }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      ></iframe>
    )
  }
];

const SelectedWork = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const infoRef = useRef(null);

  const nextProject = () => {
    animateTransition(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    });
  };

  const prevProject = () => {
    animateTransition(() => {
      setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    });
  };

  const animateTransition = (updateState) => {
    const tl = gsap.timeline();
    tl.to([slideRef.current, infoRef.current], {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        updateState();
        gsap.to([slideRef.current, infoRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  };

  return (
    <section className="work-section">
      <div className="container">
        <h2 className="section-title">selected work</h2>
        
        <div className="work-showcase">
          <div className="work-media" ref={slideRef}>
            {projects[currentIndex].embed ? (
              projects[currentIndex].embed
            ) : (
              <a href={projects[currentIndex].link} target="_blank" rel="noreferrer" className="media-placeholder">
                <div className="media-icon-wrapper">
                  <Video size={48} className="media-icon" />
                </div>
                <div className="media-overlay">
                  <span>view original post</span>
                  <ExternalLink size={20} />
                </div>
              </a>
            )}
          </div>
          
          <div className="work-details" ref={infoRef}>
            <div className="work-info">
              <h3 className="work-title">{projects[currentIndex].title}</h3>
              <p className="work-desc">{projects[currentIndex].description}</p>
            </div>
            
            <div className="work-nav">
              <button onClick={prevProject} className="nav-btn" aria-label="previous project">
                <ArrowLeft />
              </button>
              <span className="work-counter">0{currentIndex + 1} / 0{projects.length}</span>
              <button onClick={nextProject} className="nav-btn" aria-label="next project">
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
