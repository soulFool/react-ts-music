import type { Props as LoadingProps } from "@/components/base/loading";
import { createRoot } from "react-dom/client";
import { useEffect, useRef } from "react";
import Loading from "@/components/base/loading";
import { addClass, removeClass } from "@/assets/ts/dom";

export default function useDynamicLoading<T extends HTMLElement>(
  isLoading: boolean,
  loadingProps?: LoadingProps
) {
  const loadingRef = useRef<({ root: T } & { [key: string]: any }) | T>(null);

  useEffect(() => {
    // 获取实际的 DOM 元素
    const element =
      loadingRef.current &&
      ("root" in loadingRef.current
        ? loadingRef.current.root
        : loadingRef.current);
    if (!element) return;

    const style = getComputedStyle(element);
    if (["fixed", "absolute", "relative"].indexOf(style.position) === -1) {
      addClass(element, "relative");
    }

    const container = document.createElement("div");
    container.className = "w-full h-full absolute inset-0";
    const root = createRoot(container);
    root.render(<Loading {...loadingProps} />);

    if (isLoading) {
      element.appendChild(container);
    }

    return () => {
      if (element) {
        removeClass(element, "relative");
      }
      setTimeout(() => {
        root.unmount();
        container.remove();
      }, 0);
    };
  }, [isLoading]);

  return loadingRef;
}
