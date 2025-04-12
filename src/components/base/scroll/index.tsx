import type { PropsWithChildren, Ref } from "react";
import type { Options } from "@better-scroll/core";
import type BScroll from "@better-scroll/core";
import { useImperativeHandle, useRef } from "react";
import useScroll from "./useScroll";

type Props = PropsWithChildren & {
  className?: string;
  options?: Options;
  onScroll?: (pos: { x: number; y: number }) => void;
  ref?: Ref<BScroll>;
};

const defaultOptions = {
  click: true,
  probeType: 0,
};

const Scroll = ({
  ref,
  className = "",
  options = {}, // 改为空对象
  children,
  onScroll,
}: Props) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scroll = useScroll(
    rootRef,
    { ...defaultOptions, ...options },
    onScroll
  ); // 合并默认选项和传入的选项

  useImperativeHandle(ref, () => ({
    scroll: () => scroll.current,
  }))

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
};

export default Scroll;
