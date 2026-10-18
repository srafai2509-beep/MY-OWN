import React, { useEffect, useRef } from 'react';

export const CanvasBackground3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for subtle golden ambient constellation
    const particleCount = Math.min(width < 768 ? 25 : 55, 60);
    const particles: {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      radius: number;
      baseAlpha: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 400 - 200, // 3D depth position
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.15,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const mouseDeltaX = (mouseX - width / 2) * 0.0003;
      const mouseDeltaY = (mouseY - height / 2) * 0.0003;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx + mouseDeltaX * (p.z + 200) * 0.1;
        p.y += p.vy + mouseDeltaY * (p.z + 200) * 0.1;
        p.z += p.vz;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        if (p.z < -200) p.z = 200;
        if (p.z > 200) p.z = -200;

        // Perspective 3D scaling
        const fov = 400;
        const scale = fov / (fov + p.z);
        const screenX = (p.x - width / 2) * scale + width / 2;
        const screenY = (p.y - height / 2) * scale + height / 2;
        const screenRadius = Math.max(0.5, p.radius * scale);

        const alpha = Math.max(0.05, Math.min(0.6, p.baseAlpha * scale));

        ctx.beginPath();
        ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
        ctx.fill();

        // Connect nearby nodes with subtle golden thread lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dz = p.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.12 * scale;
            const scale2 = fov / (fov + p2.z);
            const screenX2 = (p2.x - width / 2) * scale2 + width / 2;
            const screenY2 = (p2.y - height / 2) * scale2 + height / 2;

            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(screenX2, screenY2);
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-60"
      aria-hidden="true"
    />
  );
};
