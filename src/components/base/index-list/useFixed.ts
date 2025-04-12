import type { ISingerGroup } from "@/service/type";
import { useEffect, useRef, useState } from "react";

export default function useFixed(data: ISingerGroup[]) {
  const TITLE_HEIGHT = 30;

  const groupElRef = useRef<HTMLUListElement>(null);
  const listHeights = useRef<number[]>([]);
  const scrollY = useRef<number>(0);
  const currentIndex = useRef<number>(0);
  const fixedTitleRef = useRef("");
  const distance = useRef(0);

  const [fixedTitle, setFixedTitle] = useState("");
  const fixedElRef = useRef<HTMLDivElement>(null);

  const getFixedStyle = () => {
    if (!fixedElRef.current) return

    const diff =
      distance.current > 0 && distance.current < TITLE_HEIGHT
        ? distance.current - TITLE_HEIGHT
        : 0;

    fixedElRef.current.style.transform = `translate3d(0, ${diff}px, 0)`;
    // setFixedStyle({
    //   transform: `translate3d(0, ${diff}px, 0)`,
    // });
  };

  // 将滚动逻辑抽离成独立函数
  function updateTitle() {
    const listHeightVal = listHeights.current;
    for (let i = 0; i < listHeightVal.length - 1; i++) {
      const heightTop = listHeightVal[i];
      const heightBottom = listHeightVal[i + 1];

      if (scrollY.current < 0) {
        fixedTitleRef.current = "";
        setFixedTitle(fixedTitleRef.current);
        break;
      }

      if (scrollY.current >= heightTop && scrollY.current <= heightBottom) {
        currentIndex.current = i;
        distance.current = heightBottom - scrollY.current;

        getFixedStyle();

        const currentGroup = data[currentIndex.current];
        const newTitle = currentGroup ? currentGroup.title : "";
        if (newTitle !== fixedTitleRef.current) {
          fixedTitleRef.current = newTitle;
          setFixedTitle(fixedTitleRef.current);
        }
      }
    }
  }

  function onScroll(pos: { x: number; y: number }) {
    scrollY.current = -pos.y;

    requestAnimationFrame(updateTitle);
  }

  function calculate() {
    const group = groupElRef.current;

    if (!group) return;

    const list = group.children;
    let height = 0;

    listHeights.current.length = 0;
    listHeights.current.push(height);

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight;
      listHeights.current.push(height);
    }
  }

  // 组件挂载后，计算一次
  useEffect(() => {
    calculate();
  }, []);

  return {
    groupElRef,
    fixedTitle,
    fixedElRef,
    currentIndex,

    onScroll,
  };
}
