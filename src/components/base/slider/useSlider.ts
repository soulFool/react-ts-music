import type { RefObject } from "react";
import { useRef, useEffect, useState } from "react";
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";

// eslint-disable-next-line react-hooks/rules-of-hooks
BScroll.use(Slide); // 注册插件 Slide

export default function useSlider<T extends HTMLElement>(
  wrapperRef: RefObject<T | null>
) {
  const slider = useRef<BScroll | null>(null);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const sliderVal = (slider.current = new BScroll(wrapperRef.current, {
      click: true, // 允许点击
      scrollX: true, // 允许横向滑动
      scrollY: false, // 不允许纵向滑动
      momentum: false, // 不允许惯性滑动
      bounce: false, // 不允许回弹
      probeType: 2, // 监听滑动事件
      slide: true, // 启用 slide 插件, 并使用 slide 默认配置
    }));

    sliderVal.on("slideWillChange", (page: { pageX: number }) => {
      setCurrentPageIndex(page.pageX);
    });

    return () => {
      slider.current?.destroy();
    };
  }, []);

  return {
    slider,
    currentPageIndex,
  };
}
