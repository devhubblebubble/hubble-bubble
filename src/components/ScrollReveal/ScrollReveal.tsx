"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Create one IntersectionObserver that shows elements when they enter viewport
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );

    // Observe all current .reveal elements (excluding already-animated ones)
    const observe = () => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    };

    // Small delay lets the new page's DOM render before we scan
    const timer = setTimeout(observe, 80);

    // MutationObserver catches elements added after the initial render
    // (e.g. client components that hydrate late)
    const mo = new MutationObserver(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]); // Re-runs on every route change

  return null;
}
