type Star = {
  left: number;
  top: number;
  size: number;
  opacity: number;
  twinkle: boolean;
  delay: number;
};

// Deterministic values keep the server and client render identical.
const stars: Star[] = Array.from({ length: 54 }, (_, index) => ({
  left: (index * 37 + 11) % 101,
  top: (index * 61 + 7) % 97,
  size: index % 13 === 0 ? 2.1 : index % 5 === 0 ? 1.35 : 0.8,
  opacity: 0.2 + ((index * 17) % 43) / 100,
  twinkle: index % 11 === 0,
  delay: (index % 7) * 1.7,
}));

export function StarField() {
  return (
    <div className="star-field" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          className={star.twinkle ? "star star--twinkle" : "star"}
          key={index}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
