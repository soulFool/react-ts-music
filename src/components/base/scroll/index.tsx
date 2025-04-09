import type { PropsWithChildren } from "react";
import type { Options } from "@better-scroll/core";
import { useRef } from "react";
import useScroll from "./useScroll";

type Props = PropsWithChildren & {
  className?: string;
  options?: Options;
  onScroll?: (pos: { x: number; y: number }) => void;
};

const defaultOptions = {
  click: true,
  probeType: 0
};

const Scroll = ({
  className = "",
  options = {},  // 改为空对象
  children,
  onScroll,
}: Props) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useScroll(rootRef, { ...defaultOptions, ...options }, onScroll);  // 合并默认选项和传入的选项

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
};

export default Scroll;
