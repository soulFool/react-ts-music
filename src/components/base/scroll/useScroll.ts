import type { RefObject } from "react";
import type { Options } from "@better-scroll/core";
import { useRef, useEffect } from "react";
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";

// eslint-disable-next-line react-hooks/rules-of-hooks
BScroll.use(ObserveDOM); // 注册插件 ObserveDOM

export default function useScroll<T extends HTMLElement>(
  wrapperRef: RefObject<T | null>,
  options?: Options,
  onScroll?: (pos: { x: number; y: number }) => void
) {
  const scroll = useRef<BScroll | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const scrollVal = scroll.current = new BScroll(wrapperRef.current, {
      observeDOM: true,
      ...options,
    });

    if (options && options.probeType && options.probeType > 0) {
      (scrollVal as BScroll).on('scroll', (pos: { x: number; y: number }) => {
        onScroll?.(pos)
      })
    }

    return () => {
      scroll.current?.destroy();
    };
  }, []);

  return scroll;
}
