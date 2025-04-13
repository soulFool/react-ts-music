import type { PropsWithChildren, Ref } from "react";
import type { Options } from "@better-scroll/core";
import type BScroll from "@better-scroll/core";
import { useImperativeHandle, useRef } from "react";
import useScroll from "./useScroll";

type Props = PropsWithChildren & {
  className?: string;
  style?: React.CSSProperties;
  options?: Options;
  onScroll?: (pos: { x: number; y: number }) => void;
  ref?: Ref<{ 
    root: HTMLDivElement | null;
    scroll: () => BScroll | null }>;
};

const defaultOptions = {
  click: true,
  probeType: 0,
};

const Scroll = ({
  ref,
  className = "",
  style = {},
  options = {}, // 改为空对象
  children,
  onScroll,
}: Props) => {
  const rootElRef = useRef<HTMLDivElement | null>(null);
  const scroll = useScroll(
    rootElRef,
    { ...defaultOptions, ...options },
    onScroll
  ); // 合并默认选项和传入的选项

  useImperativeHandle(ref, () => ({
    root: rootElRef.current,
    scroll: () => scroll.current
  }));

  return (
    <div ref={rootElRef} className={className} style={style}>
      {children}
    </div>
  );
};

export default Scroll;
