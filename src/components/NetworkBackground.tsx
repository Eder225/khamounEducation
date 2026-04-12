import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Brand colors with low opacity for a light tech feel
    const colors = [
      'rgba(130, 65, 176, 0.6)', // khamoun-primary (Purple)
      'rgba(214, 40, 57, 0.6)',  // khamoun-secondary (Red)
      'rgba(111, 176, 65, 0.6)', // khamoun-accent (Green)
      'rgba(148, 163, 184, 0.5)' // slate-400
    ];

    const resize = () => {
      // Get the parent element's dimensions instead of window to fit the section
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Increased particle density (was / 12000)
      const numParticles = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < numParticles; i++) {
        // 60% chance of being slate, 40% chance of being a brand color (more color)
        const isBrandColor = Math.random() > 0.6;
        const colorIndex = isBrandColor ? Math.floor(Math.random() * 3) : 3;
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 0.8,
          color: colors[colorIndex]
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges smoothly
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw connections first so they are under the nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Increased connection distance (was 150)
          const connectionLimit = 180;
          if (distance < connectionLimit) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Slightly higher opacity for connections
            const opacity = 1 - distance / connectionLimit;
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.35})`; 
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      // Draw nodes on top of lines
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ opacity: 0.7 }}
    />
  );
};
