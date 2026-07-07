"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    setVisible(true);

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onEnter = () => {
      ring.style.width = "42px";
      ring.style.height = "42px";
      ring.style.opacity = "0.9";
      dot.style.transform = "translate(-50%, -50%) scale(0.5)";
    };
    const onLeave = () => {
      ring.style.width = "25px";
      ring.style.height = "25px";
      ring.style.opacity = "0.6";
      dot.style.transform = "translate(-50%, -50%) scale(1)";
    };

    document.addEventListener("mousemove", onMove);

    // Delegated hover detection — two listeners total instead of one per element
    let hovering = false;
    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as Element).closest?.("a, button, [data-cursor]");
      if (interactive && !hovering) {
        hovering = true;
        onEnter();
      } else if (!interactive && hovering) {
        hovering = false;
        onLeave();
      }
    };
    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" style={visible ? {} : { display: "none" }} />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" style={visible ? {} : { display: "none" }} />
    </>
  );
}
