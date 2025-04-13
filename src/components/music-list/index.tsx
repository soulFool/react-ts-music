import type { ISingerDetail } from "@/service/type";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Scroll from "../base/scroll";
import SongList from "../base/song-list";
import useDynamicLoading from "@/hooks/useDynamicLoading";

type Props = {
  songs: ISingerDetail[];
  title: string;
  pic: string;
  loading: boolean;
};

const MusicList = ({ songs, title, pic, loading }: Props) => {
  const RESERVED_HEIGHT = 45;

  const navigate = useNavigate();

  const bgImageElRef = useRef<HTMLDivElement>(null);
  const maxTranslateY = useRef(0);
  const imageHeight = useRef(0);

  const [scrollY, setScrollY] = useState(0); // 滚动的位置

  const loadingRef = useDynamicLoading<HTMLDivElement>(loading);

  const bgImageStyle = () => {
    let zIndex = 0;
    let paddingTop = "70%";
    let height = "0";
    let translateZ = 0;

    if (scrollY > maxTranslateY.current) {
      zIndex = 10;
      paddingTop = "0";
      height = `${RESERVED_HEIGHT}px`;
      translateZ = 1;
    }

    let scale = 1
    if (scrollY < 0) {
      scale = 1 + Math.abs(scrollY / imageHeight.current)
    }

    return {
      zIndex,
      paddingTop,
      height,
      backgroundImage: `url(${pic})`,
      transform: `scale(${scale}) translateZ(${translateZ}px)`,
    };
  };
  const scrollStyle = {
    top: `${imageHeight.current}px`,
  };
  const filterStyle = () => {
    let blur = 0
    
    if (scrollY >= 0) {
      blur = Math.min(maxTranslateY.current / imageHeight.current, scrollY / imageHeight.current) * 20
    }

    return {
      backdropFilter: `blur(${blur}px)`,
    }
  };

  function goBack() {
    navigate(-1);
  }

  function onScroll(pos: { x: number; y: number }) {
    setScrollY(-pos.y);
  }

  useEffect(() => {
    imageHeight.current = bgImageElRef.current!.clientHeight;
    maxTranslateY.current =
      bgImageElRef.current!.clientHeight - RESERVED_HEIGHT;
  }, []);

  return (
    <div className="relative h-full">
      <div
        className="absolute top-0 left-3 z-20 translate-z-1"
        onClick={goBack}
      >
        <i className="icon-back block p-5 text-11 text-theme"></i>
      </div>
      <h1 className="absolute top-0 left-1/10 w-8/10 z-20 translate-z-1 truncate text-center lh-20 text-9 text-text-primary">
        {title}
      </h1>
      <div
        ref={bgImageElRef}
        className="relative w-full transform-origin-t bg-cover"
        style={bgImageStyle()}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(7,17,27,0.4)]" style={filterStyle()}></div>
      </div>
      <Scroll
        ref={loadingRef as any}
        className="absolute bottom-0 w-full z-0"
        style={scrollStyle}
        options={{ probeType: 3 }}
        onScroll={onScroll}
      >
        <div className="py-10 px-15 bg-bg-primary">
          <SongList songs={songs}></SongList>
        </div>
      </Scroll>
    </div>
  );
};

export default MusicList;
