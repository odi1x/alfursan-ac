"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Player {
  id: string;
  name: string;
  club: string;
  year: string;
  imageUrl: string | null;
}

export default function PlayerCarousel({ players }: { players: Player[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 0.55;
    let animationFrameId: number;
    let resumeTimer: NodeJS.Timeout | undefined;

    const half = el.scrollWidth / 2;

    const tick = () => {
      if (!isPaused && half > 0) {
        // Since RTL, scrolling "forward" means scrollLeft goes negative
        el.scrollLeft -= SPEED;

        // When we scrolled through the first set, jump back to start
        if (Math.abs(el.scrollLeft) >= half) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resumeTimer);
    };
  }, [isPaused, players]);

  const handlePause = () => setIsPaused(true);
  const handleResume = () => {
    setTimeout(() => setIsPaused(false), 2500);
  };

  if (!players || players.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="flex gap-[12px] px-[20px] overflow-x-auto snap-x snap-mandatory scrollbar-none pb-[12px]"
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
      onMouseEnter={handlePause}
      onMouseLeave={() => setIsPaused(false)}
    >
      {[...players, ...players].map((p, i) => (
        <article key={`${p.id}-${i}`} className="flex-none basis-[164px] snap-start bg-surface border border-line rounded-[16px] overflow-hidden sm:basis-[190px]" aria-hidden={i >= players.length ? 'true' : undefined}>
          <div className="bg-[#dcdcdc] relative w-full aspect-square">
            {p.imageUrl ? (
              <Image className="w-full h-full object-cover" src={p.imageUrl} alt={i >= players.length ? "" : "اللاعب " + p.name} width={184} height={183} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-surface-2 text-muted text-xs">لا توجد صورة</div>
            )}
          </div>
          <div className="p-[14px] pt-[2px] text-center">
            <div className="font-display font-semibold text-[1rem] leading-[1.5] mt-2">{p.name}</div>
            <span className={`inline-block mt-[6px] text-[.74rem] font-semibold px-[12px] py-[3px] rounded-full text-white ${p.club.includes("الأهلي") ? "bg-academy-green" : "bg-wahda-red"}`}>{p.club}</span>
            <span className="block text-muted text-[.72rem] mt-[5px]">مواليد {p.year}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
