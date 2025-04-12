import type { Props as LoadingProps } from '@/components/base/loading'
import { createRoot } from 'react-dom/client';
import { useEffect, useRef } from 'react';
import Loading from '@/components/base/loading'
import { addClass, removeClass } from '@/assets/ts/dom'

export default function useDynamicLoading<T extends HTMLElement>(isLoading: boolean, loadingProps?: LoadingProps) {
  const loadingRef = useRef<T>(null)

  useEffect(() => {
    if (!loadingRef.current) return;

    const style = getComputedStyle(loadingRef.current);
    if (['fixed', 'absolute', 'relative'].indexOf(style.position) === -1) {
      addClass(loadingRef.current, 'relative');
    }

    const container = document.createElement('div');
    container.className = 'w-full h-full absolute inset-0';
    const root = createRoot(container);
    root.render(<Loading {...loadingProps} />);

    if (isLoading) {
      loadingRef.current.appendChild(container);
    }

    return () => {
      if (loadingRef.current) {
        removeClass(loadingRef.current, 'relative');        
      }
      root.unmount();
      container.remove();
    };
  }, [isLoading]);

  return loadingRef;
}