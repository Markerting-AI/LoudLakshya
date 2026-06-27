import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useCountUp(
  end: number,
  suffix: string = "",
  triggerRef: RefObject<HTMLElement | null>
) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!triggerRef.current) return;

    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: end,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
        onEnter: () => {
          if (!hasAnimated.current) {
            hasAnimated.current = true;
          }
        },
      },
      onUpdate: () => {
        setValue(Math.round(obj.val));
      },
    });

    return () => {
      tween.kill();
    };
  }, [end, triggerRef]);

  return `${value}${suffix}`;
}
