import { useEffect, useRef } from "react";
import Icon from "./Icon";

type Variant = "particles" | "corners";

interface FloatingDecorationsProps {
  variant: Variant;
}

const PARTICLE_GLYPHS = ["sparkles", "favorite", "pets"];
const PARTICLE_COLORS = ["#F7CFE1", "#FFF3C7", "#FF7A45"];

/**
 * Decorações animadas leves e fofas — usadas apenas em Home e Prévia.
 * "particles": estrelinhas/corações/patinhas subindo (Home).
 * "corners": doodles flutuando nos cantos (fundo da Prévia).
 * Tudo respeita prefers-reduced-motion.
 */
export default function FloatingDecorations({ variant }: FloatingDecorationsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (variant !== "particles") return;
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeouts: number[] = [];

    function createParticle() {
      if (!container) return;
      const el = document.createElement("span");
      el.className = "particle material-symbols-outlined fill";
      el.textContent = PARTICLE_GLYPHS[Math.floor(Math.random() * PARTICLE_GLYPHS.length)];
      el.style.left = Math.random() * 90 + 5 + "vw";
      el.style.fontSize = Math.random() * 14 + 12 + "px";
      el.style.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      el.style.animationDuration = Math.random() * 15 + 15 + "s";
      el.style.animationDelay = "-" + Math.random() * 30 + "s";
      container.appendChild(el);
      const t = window.setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 30000);
      timeouts.push(t);
    }

    for (let i = 0; i < 20; i++) createParticle();
    const interval = window.setInterval(createParticle, 1500);

    return () => {
      window.clearInterval(interval);
      timeouts.forEach((t) => window.clearTimeout(t));
      container.replaceChildren();
    };
  }, [variant]);

  if (variant === "particles") {
    return <div ref={containerRef} id="particles-container" aria-hidden="true" />;
  }

  // variant === "corners"
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute top-[15%] left-[5%] float-deco-1 opacity-50 text-[#ffb4ab]">
        <Icon name="favorite" fill className="text-4xl" />
      </div>
      <div className="absolute top-[25%] right-[8%] float-deco-2 opacity-50 text-[#ffd8e9]">
        <Icon name="auto_awesome" fill className="text-3xl" />
      </div>
      <div className="absolute top-[65%] left-[10%] float-deco-3 opacity-50 text-[#eee3b7]">
        <Icon name="auto_awesome" fill className="text-5xl" />
      </div>
      <div className="absolute top-[80%] right-[12%] float-deco-4 opacity-50 text-white">
        <Icon name="favorite" fill className="text-4xl" />
      </div>
    </div>
  );
}
