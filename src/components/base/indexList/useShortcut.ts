import type { ISingerGroup } from "@/service/type";
import type BScroll from "@better-scroll/core";
import { useEffect, useRef, useState } from "react";

export default function useShortcut(
  data: ISingerGroup[],
  groupRef: React.RefObject<HTMLUListElement | null>
) {
  const ANCHOR_HEIGHT = 18;

  const scrollRef = useRef<BScroll>(null);
  const touchRef = useRef({
    y1: 0,
    y2: 0,
    anchorIndex: 0,
  })

  const [shortcutList, setShortcutList] = useState<string[]>([]);

  function onShortcutTouchStart(e: React.TouchEvent) {
    const target = e.target as HTMLLIElement;
    const anchorIndex = parseInt(target.dataset.index!);
    touchRef.current.y1 = e.touches[0].pageY
    touchRef.current.anchorIndex =anchorIndex
    
    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove(e: React.TouchEvent) {
    touchRef.current.y2 = e.touches[0].pageY
    const delta = (touchRef.current.y2 - touchRef.current.y1) / ANCHOR_HEIGHT | 0
    const anchorIndex = touchRef.current.anchorIndex + delta

    scrollTo(anchorIndex)
  }

  function scrollTo(index: number) {
    if (isNaN(index)) return;
    index = Math.max(0, Math.min(shortcutList.length - 1, index));
    const targetEl = groupRef.current!.children[index] as HTMLElement;
    (scrollRef.current!.scroll() as BScroll).scrollToElement(targetEl, 0, 0, 0);
  }

  useEffect(() => {
    const list = data.map((group) => {
      return group.title;
    });
    setShortcutList(list);
  }, []);

  return {
    scrollRef,
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove,
  };
}
