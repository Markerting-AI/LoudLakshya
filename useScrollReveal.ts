import { useEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  stagger?: number;
}

export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {}
) {
  const {
    delay = 0,
    direction = "up",
    distance = 40,
    duration = 0.8,
    stagger = 0,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const xMap = {
      up: 0,
      down: 0,
      left: -distance,
      right: distance,
    };
    const yMap = {
      up: distance,
      down: -distance,
      left: 0,
      right: 0,
    };

    const targets = stagger > 0
      ? ref.current.children
      : ref.current;

    gsap.set(targets, {
      opacity: 0,
      x: xMap[direction],
      y: yMap[direction],
    });

    const tween = gsap.to(targets, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      stagger: stagger > 0 ? stagger : undefined,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, [ref, delay, direction, distance, duration, stagger]);
}
