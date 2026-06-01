import { useMemo, useState, type CSSProperties } from "react";

/**
 * Chuvinha fofa de comidinhas japonesas — decorativa, **apenas na Home**.
 * Itens caem devagar, com leve rotação, tamanhos/velocidades/posições variados.
 * Fica atrás do conteúdo (z-0), não captura cliques e não atrapalha a leitura.
 * Respeita prefers-reduced-motion: nesse caso mostra poucos itens estáticos.
 */

const SUSHI = [
  "/assets/personal/sushi-bowl.png",
  "/assets/personal/sushi-nigiri.png",
  "/assets/personal/sushi-kawaii.png",
];

const FALLING_COUNT = 15;
const STATIC_COUNT = 6;

interface Drop {
  src: string;
  left: number; // %
  top: number; // % (usado só no modo estático)
  size: number; // px
  duration: number; // s
  delay: number; // s (negativo = começa adiantado)
  rotation: number; // deg
  opacity: number;
}

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function makeDrop(): Drop {
  return {
    src: SUSHI[Math.floor(Math.random() * SUSHI.length)],
    left: rand(2, 90),
    top: rand(8, 200),
    size: Math.round(rand(10,80)),
    duration: rand(5, 20),
    delay: -rand(0, 22),
    rotation: rand(-40, 80),
    opacity: Number(rand(0.45, 0.75).toFixed(2)),
  };
}

/** Variáveis CSS customizadas usadas pela animação de queda. */
type DropVars = CSSProperties & {
  "--duration"?: string;
  "--delay"?: string;
  "--rotation"?: string;
  "--peak"?: number;
};

export default function SushiRain() {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const count = reduced ? STATIC_COUNT : FALLING_COUNT;
  const drops = useMemo<Drop[]>(
    () => Array.from({ length: count }, makeDrop),
    [count],
  );

  return (
    <div className="sushi-rain" aria-hidden="true">
      {drops.map((d, i) => {
        const style: DropVars = reduced
          ? {
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: `${d.size}px`,
              opacity: d.opacity,
              transform: `rotate(${d.rotation}deg)`,
            }
          : {
              left: `${d.left}%`,
              width: `${d.size}px`,
              "--duration": `${d.duration}s`,
              "--delay": `${d.delay}s`,
              "--rotation": `${d.rotation}deg`,
              "--peak": d.opacity,
            };
        return (
          <img
            key={i}
            src={d.src}
            alt=""
            className={`sushi-item ${reduced ? "sushi-item--static" : "sushi-item--fall"}`}
            style={style}
          />
        );
      })}
    </div>
  );
}
