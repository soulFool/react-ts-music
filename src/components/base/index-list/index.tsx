import type { ISingerGroup, ISingerGroupItem } from "@/service/type";
import LazyImage from "../lazy-image";
import Scroll from "../scroll";
import useFixed from "./useFixed";
import useShortcut from "./useShortcut";

type Props = {
  data: ISingerGroup[];
  onSelect: (item: ISingerGroupItem) => void;
};

const IndexList = ({ data, onSelect }: Props) => {
  const { groupElRef, currentIndex, fixedTitle, fixedElRef, onScroll } =
    useFixed(data);
  const { scrollRef, shortcutList, onShortcutTouchStart, onShortcutTouchMove } =
    useShortcut(data, groupElRef);

  function onItemClick(item: ISingerGroupItem) {
    onSelect(item);
  }

  return (
    <Scroll
      ref={scrollRef}
      className="relative w-full h-full overflow-hidden bg-bg-primary"
      options={{ probeType: 3 }}
      onScroll={onScroll}
    >
      <ul ref={groupElRef}>
        {data.map((group) => (
          <li key={group.title} className="pb-15">
            <h2 className="h-15 lh-15 pl-10 text-6 text-text-l bg-highlight-bg">
              {group.title}
            </h2>
            <ul>
              {group.list.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center pt-10 pl-15"
                  onClick={() => {
                    onItemClick(item);
                  }}
                >
                  <LazyImage
                    src={item.pic}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <span className="ml-10 text-text-l text-7">{item.name}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {fixedTitle && (
        <div ref={fixedElRef} className="absolute top-0 left-0 w-full">
          <div className="h-15 lh-15 pl-10 text-6 text-text-l bg-highlight-bg">
            {fixedTitle}
          </div>
        </div>
      )}
      <div
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 py-10 rounded-[10px] text-center bg-bg-d font-[Helvetica]"
        onTouchStart={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onShortcutTouchStart(e);
        }}
        onTouchMove={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onShortcutTouchMove(e);
        }}
      >
        <ul>
          {shortcutList.map((item, index) => (
            <li
              key={item}
              className={`${
                currentIndex.current === index && "text-theme"
              } p-[3px] lh-[1.5rem] text-text-l text-2xl`}
              data-index={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Scroll>
  );
};

export default IndexList;
