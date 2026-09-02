export function Stars({ value, size = 13 }: { value: number; size?: number }) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <span
      className="inline-flex items-center gap-[1px] text-gold"
      style={{ fontSize: size }}
      aria-label={`Rated ${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} aria-hidden="true">
          {rounded >= i ? "★" : rounded >= i - 0.5 ? "⯨" : "☆"}
        </span>
      ))}
    </span>
  );
}
