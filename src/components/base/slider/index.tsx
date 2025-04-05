import { useRef } from "react";
import useSlider from "./useSlider";

type Props = {
  sliders: any[];
};

const Slider = ({ sliders }: Props) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const { currentPageIndex } = useSlider(rootRef);

  return (
    <div ref={rootRef} className="min-h-[1px] text-0 touch-pan-y">
      <div className="relative overflow-hidden whitespace-nowrap">
        {sliders.map((item) => (
          <div
            key={item.id}
            className="inline-block transform-gpu backface-hidden"
          >
            <a className="block w-full" href={item.link}>
              <img className="block w-full" src={item.pic} alt={item.title} />
            </a>
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 bottom-6 lh-6 -translate-x-1/2">
        {sliders.map((item, index) => (
          <span
            key={item.id}
            className={`${
              currentPageIndex === index
                ? "w-10 rounded-[5px] bg-text-ll"
                : "w-4 rounded-full bg-text-l"
            } inline-block mx-2 h-4`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
