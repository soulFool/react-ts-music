import type { PropsWithChildren } from "react";
import type { Options } from "@better-scroll/core";
import { useRef } from "react";
import useScroll from "./useScroll";

type Props = PropsWithChildren & {
  className?: string;
  options?: Options;
};

const Scroll = ({
  className = "",
  options = { click: true },
  children,
}: Props) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useScroll(rootRef, options);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
};

export default Scroll;
