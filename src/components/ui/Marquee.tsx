"use client";

interface MarqueeProps {
  items: string[];
  separator?: string;
  className?: string;
  speed?: string;
}

export default function Marquee({
  items,
  separator = "·",
  className = "",
  speed = "22s",
}: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      aria-label={items.join(", ")}
    >
      <div
        className="marquee-track"
        style={{ animationDuration: speed }}
        aria-hidden="true"
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4">
            <span>{item}</span>
            <span className="opacity-50">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
