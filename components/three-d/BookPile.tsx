import { Book3D } from "./Book3D";

const PALETTES = [
  ["var(--color-coral)", "var(--color-sun)", "var(--color-mint)", "var(--color-cobalt)"],
  ["var(--color-cobalt)", "var(--color-sun)", "var(--color-coral)", "var(--color-mint)"],
  ["var(--color-mint)", "var(--color-coral)", "var(--color-sun)", "var(--color-canvas)"],
];

/** Chồng sách nằm ngang. Số lớp thể hiện số sách (tối đa 5); rỗng thì hiện 3 lớp mờ. */
export function BookPile({ count, variant = 0, className = "" }: { count: number; variant?: number; className?: string }) {
  const layers = Math.max(3, Math.min(5, count || 3));
  const pal = PALETTES[variant % PALETTES.length];
  return (
    <div className={`scene ${className}`} style={{ ["--u" as string]: "4.6px" }} aria-hidden="true">
      <div className="relative mx-auto" style={{ width: "calc(var(--u) * 40)", height: "calc(var(--u) * 34)" }}>
        <div
          className="pile absolute inset-x-0 bottom-0 flex flex-col-reverse items-center"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(-16deg) rotateY(-30deg)", transition: "transform .5s var(--ease-flip)" }}
        >
          {Array.from({ length: layers }).map((_, i) => (
            <div key={i} style={{ transformStyle: "preserve-3d", transform: `rotateY(${[0, 7, -5, 9, -3][i]}deg) translateX(calc(var(--u) * ${[0, 1.2, -1, 1.6, -0.6][i]}))`, marginTop: "-1px" }}>
              <Book3D w={[36, 32, 35, 30, 33][i]} h={6.5} d={26} face={pal[i % pal.length]} side="var(--color-ink)" top={pal[i % pal.length]} frontPages topPages={false} topFace={i === layers - 1 ? <b className="absolute left-[12%] top-[20%] block h-[16%] w-[50%] bg-canvas" /> : undefined} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
