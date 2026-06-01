/**
 * Variante "cãozinho" do monitor retrô da Home. Mantém exatamente a mesma
 * moldura do [PixelPetMonitor] (corpo creme, tela rosa, base, brilho 8-bit),
 * mas exibe a foto pixel do cão dentro da tela — recortada na área da tela e
 * com object-fit "contain" (preserveAspectRatio meet) para não distorcer.
 * O PixelPetMonitor (gatinho) permanece em uso na tela de Perfil.
 */
export default function PixelDogMonitor({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 96"
      className={className}
      role="img"
      aria-label="Ilustração de um cãozinho em um monitor retrô"
      shapeRendering="crispEdges"
    >
      <defs>
        <clipPath id="dog-screen-clip">
          <rect x="16" y="13" width="96" height="50" rx="3" />
        </clipPath>
      </defs>

      {/* Corpo do monitor */}
      <rect x="6" y="4" width="116" height="74" rx="6" fill="#efe3b8" stroke="#1a1c1b" strokeWidth="3" />
      {/* Tela */}
      <rect x="16" y="13" width="96" height="50" rx="3" fill="#FF9EC6" stroke="#1a1c1b" strokeWidth="2.5" />

      {/* Cãozinho (foto pixel) recortado na área da tela */}
      <image
        href="/assets/personal/dog-pixel.png"
        x="18"
        y="14"
        width="92"
        height="48"
        preserveAspectRatio="xMidYMid meet"
        clipPath="url(#dog-screen-clip)"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Base do monitor */}
      <rect x="54" y="78" width="20" height="7" fill="#d1c79d" stroke="#1a1c1b" strokeWidth="2.5" />
      <rect x="42" y="85" width="44" height="7" rx="2" fill="#efe3b8" stroke="#1a1c1b" strokeWidth="3" />

      {/* Brilho na tela */}
      <path d="M22 18 l8 0 -8 8 z" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}
