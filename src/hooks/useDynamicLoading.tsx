import type { RefObject } from 'react'
import type { Props as LoadingProps } from '@/components/base/loading'
import { createRoot } from 'react-dom/client';
import { useEffect } from 'react';
import Loading from '@/components/base/loading'
import { addClass, removeClass } from '@/assets/ts/dom'

export default function useDynamicLoading(parentRef: RefObject<HTMLElement | null>, isLoading: boolean, loadingProps?: LoadingProps) {
  useEffect(() => {
    if (!parentRef.current) return;

    const style = getComputedStyle(parentRef.current);
    if (['fixed', 'absolute', 'relative'].indexOf(style.position) === -1) {
      addClass(parentRef.current, 'relative');
    }

    const container = document.createElement('div');
    container.className = 'w-full h-full absolute inset-0';
    const root = createRoot(container);
    root.render(<Loading {...loadingProps} />);

    if (isLoading) {
      parentRef.current.appendChild(container);
    }

    return () => {
      if (parentRef.current) {
        removeClass(parentRef.current, 'relative');        
      }
      root.unmount();
      container.remove();
    };
  }, [isLoading, parentRef]);
}