/**
 * GridOverlay — decorative 12-column grid lines shown as a fixed overlay.
 * Purely visual, pointer-events: none. Helps align content and gives the
 * "structured grid" look requested by the designer.
 */
export function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[10] pointer-events-none select-none"
      style={{ mixBlendMode: "overlay" }}
    >
      <div className="relative h-full max-w-[1920px] mx-auto px-6 md:px-10">
        <div className="h-full grid grid-cols-4 md:grid-cols-12 gap-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="hidden md:block h-full border-l border-white/[0.04] last:border-r"
            />
          ))}
          {/* Mobile: 4 columns */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`m-${i}`}
              className="md:hidden h-full border-l border-white/[0.04] last:border-r"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
