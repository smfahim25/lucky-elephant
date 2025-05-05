"use client"; 
// If you’re on Next.js App Router & want a Client Component

import { useEffect, useState, useMemo } from "react";
// 1) Import the React wrapper + engine init from @tsparticles/react
import Particles, { initParticlesEngine } from "@tsparticles/react";
// 2) Import the loader you want, for example loadSlim:
import { loadSlim } from "@tsparticles/slim";

// This approach is from the official docs—no "loadFull" needed
const Particle = () => {
  // We'll manage an "init" state so we only load once
  const [init, setInit] = useState(false);

  useEffect(() => {
    // initParticlesEngine can be called once per app lifetime
    initParticlesEngine(async (engine) => {
      // You can load whichever modules you want, here we do "loadSlim"
      await loadSlim(engine);
    }).then(() => {
      // Once loaded, set init = true so we can render <Particles />
      setInit(true);
    });
  }, []);

  // Optional config object (inline or from a separate file)
  const particlesOptions = useMemo(() => {
    return {
      backgroundMode: {
        enable: false,
        zIndex: 0,
      },
      background: {
        color: "transparent",
      },
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
          bubble: {
            distance: 100,
            duration: 0.7,
            opacity: 1,
            size: 1,
            speed: 2,
          },
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

  // Render nothing until the engine is initialized
  if (!init) return null;

  return (
    <Particles
      className="banner_particles"
      // Particles props
      id="tsparticles"
      options={particlesOptions}
      // you can also define a callback if you want:
      particlesLoaded={(container) => {
        // console.log("Particles Loaded!", container);
      }}
    />
  );
};

export default Particle;
