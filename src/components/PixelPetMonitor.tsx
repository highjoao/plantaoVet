/**
 * Ilustração autocontida (SVG) de um gatinho com estetoscópio num monitor
 * retro Y2K — substitui a imagem remota do export Stitch (link efêmero),
 * preservando a linguagem visual: contornos grossos escuros, tela rosa,
 * corpo do monitor creme, estética 8-bit fofa.
 */
export default function PixelPetMonitor({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 96"
      className={className}
      role="img"
      aria-label="Ilustração de um gatinho com estetoscópio em um monitor retrô"
      shapeRendering="crispEdges"
    >
      {/* Corpo do monitor */}
      <rect x="6" y="4" width="116" height="74" rx="6" fill="#efe3b8" stroke="#1a1c1b" strokeWidth="3" />
      {/* Tela */}
      <rect x="16" y="13" width="96" height="50" rx="3" fill="#FF9EC6" stroke="#1a1c1b" strokeWidth="2.5" />

      {/* Gatinho */}
      <g stroke="#1a1c1b" strokeWidth="2.2" strokeLinejoin="round">
        {/* Orelhas */}
        <path d="M50 30 L54 20 L62 27 Z" fill="#fffdf7" />
        <path d="M78 30 L74 20 L66 27 Z" fill="#fffdf7" />
        {/* Cabeça */}
        <circle cx="64" cy="40" r="15" fill="#fffdf7" />
      </g>
      {/* Bochechas */}
      <circle cx="55" cy="44" r="2.6" fill="#FF7A45" opacity="0.7" />
      <circle cx="73" cy="44" r="2.6" fill="#FF7A45" opacity="0.7" />
      {/* Olhos */}
      <circle cx="58.5" cy="38" r="2.2" fill="#1a1c1b" />
      <circle cx="69.5" cy="38" r="2.2" fill="#1a1c1b" />
      {/* Nariz / boca */}
      <path d="M64 41 l-2 2 h4 z" fill="#1a1c1b" />
      <path d="M64 43 v2" stroke="#1a1c1b" strokeWidth="1.6" />
      {/* Bigodes */}
      <g stroke="#1a1c1b" strokeWidth="1.4" strokeLinecap="round">
        <path d="M50 40 h-7 M50 44 h-6" />
        <path d="M78 40 h7 M78 44 h6" />
      </g>

      {/* Estetoscópio */}
      <g fill="none" stroke="#44655a" strokeWidth="2.4" strokeLinecap="round">
        <path d="M57 53 C57 60 71 60 71 53" />
        <path d="M71 53 q6 6 1 12" />
      </g>
      <circle cx="71" cy="66" r="3.4" fill="#c7ebdd" stroke="#1a1c1b" strokeWidth="2" />

      {/* Base do monitor */}
      <rect x="54" y="78" width="20" height="7" fill="#d1c79d" stroke="#1a1c1b" strokeWidth="2.5" />
      <rect x="42" y="85" width="44" height="7" rx="2" fill="#efe3b8" stroke="#1a1c1b" strokeWidth="3" />

      {/* Brilho na tela */}
      <path d="M22 18 l8 0 -8 8 z" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}
