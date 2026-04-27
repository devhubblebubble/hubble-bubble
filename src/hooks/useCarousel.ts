import { useState, useCallback, useEffect } from "react";

export function useCarousel(count: number, autoMs = 7000) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (i: number) => setIdx(((i % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % count), autoMs);
    return () => clearInterval(t);
  }, [paused, count, autoMs]);

  return { idx, go, setPaused };
}
