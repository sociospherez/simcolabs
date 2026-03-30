import { useEffect, useRef } from "react";
import useThemeMode from "../../hooks/useThemeMode";

export default function LabBackground() {
  const canvasRef = useRef(null);
  const isNight = useThemeMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId;

    const particles = [];
    const particleCount = isNight
      ? Math.min(55, Math.floor(width / 28))
      : Math.min(35, Math.floor(width / 40));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.6 + 0.6,
          dx: (Math.random() - 0.5) * (isNight ? 0.18 : 0.12),
          dy: (Math.random() - 0.5) * (isNight ? 0.18 : 0.12),
        });
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = isNight ? 120 : 95;

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.strokeStyle = isNight
              ? `rgba(125, 211, 252, ${0.06 * (1 - dist / maxDist)})`
              : `rgba(59, 130, 246, ${0.045 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      drawConnections();

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isNight
          ? "rgba(147, 197, 253, 0.45)"
          : "rgba(59, 130, 246, 0.22)";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      createParticles();
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isNight]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 -z-20 h-full w-full transition-opacity duration-500 ${
          isNight ? "opacity-90" : "opacity-55"
        }`}
      />
      <div
        className={`pointer-events-none fixed inset-0 -z-10 transition-opacity duration-500 ${
          isNight
            ? "bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.08),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.06),transparent_24%)] opacity-100"
            : "bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.06),transparent_22%),radial-gradient(circle_at_20%_80%,rgba(96,165,250,0.05),transparent_22%)] opacity-75"
        }`}
      />
    </>
  );
}