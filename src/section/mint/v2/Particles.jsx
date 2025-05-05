"use client";

import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Particle = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = useMemo(() => {
    return {
      backgroundMode: { enable: false, zIndex: 0 },
      background: { color: "transparent" },
      fpsLimit: 60,
      interactivity: {
        detectsOn: "canvas",
        events: {
          onClick: { enable: false, mode: "repulse" },
          onHover: {
            enable: false,
            mode: "bubble",
            parallax: { enable: false, force: 2, smooth: 10 },
          },
          resize: true,
        },
        modes: {
          bubble: { distance: 100, duration: 0.7, opacity: 1, size: 1, speed: 2 },
          grab: { distance: 10, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 1 },
          remove: { particles_nb: 1 },
          repulse: { distance: 10, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#fddba3" },
        links: { enable: false },
        move: {
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
          direction: "none",
          enable: true,
          outMode: "out",
          random: true,
          size: true,
          speed: 2,
          straight: false,
        },
        number: { density: { enable: true, area: 1000 }, value: 100 },
        opacity: { random: true, value: 0.5 },
        shape: { type: "circle" },
        size: { random: true, value: 1 },
      },
      detectRetina: true,
    };
  }, []);

  if (!init) return null;

  return (
    <Particles
      className="banner_particles"
      id="tsparticles"
      options={particlesOptions}
      particlesLoaded={(container) => {
        // ...
      }}
    />
  );
};

export default Particle;
