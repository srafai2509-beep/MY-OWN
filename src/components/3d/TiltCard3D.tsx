import React, { useRef, useState } from 'react';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  onClick?: () => void;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = '',
  maxTilt = 12,
  glareOpacity = 0.25,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, active: false }));
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative will-change-transform"
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: glare.active ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
      >
        {children}

        {/* Dynamic Specular 3D Glare */}
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(212, 175, 55, ${glare.active ? glareOpacity : 0}) 0%, rgba(255, 255, 255, 0) 65%)`,
            pointerEvents: 'none',
          }}
          className="absolute inset-0 transition-opacity duration-300 z-30"
        />
      </div>
    </div>
  );
};
