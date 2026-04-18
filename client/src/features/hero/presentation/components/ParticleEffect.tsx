import { memo, useMemo } from 'react';

interface Particle {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

const PARTICLE_COUNT = 20;

function generateParticles(count: number): Particle[] {
  // Seeded positions for deterministic rendering
  return Array.from({ length: count }, (_, i) => ({
    left: `${((i * 37 + 13) % 100)}%`,
    top: `${((i * 53 + 7) % 100)}%`,
    animationDelay: `${(i * 0.2) % 4}s`,
    animationDuration: `${2 + (i % 4)}s`,
  }));
}

export const ParticleEffect = memo(function ParticleEffect() {
  const particles = useMemo(() => generateParticles(PARTICLE_COUNT), []);

  return (
    <div className="absolute inset-0 z-5">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
          style={particle}
        />
      ))}
    </div>
  );
});
