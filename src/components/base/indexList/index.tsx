import type { ISingerGroup } from "@/service/type";
import LazyImage from "../lazyImage";
import Scroll from "../scroll";
import useFixed from "./useFixed";

type Props = {
  data: ISingerGroup[];
};

const IndexList = ({ data }: Props) => {
  const { groupRef, onScroll, fixedTitle, fixedStyle } = useFixed(data);
  return (
    <Scroll
      className="relative w-full h-full overflow-hidden bg-bg-primary"
      options={{ probeType: 3 }}
      onScroll={onScroll}
    >
      <ul ref={groupRef}>
        {data.map((group) => (
          <li key={group.title} className="pb-15">
            <h2 className="h-15 lh-15 pl-10 text-6 text-text-l bg-highlight-bg">
              {group.title}
            </h2>
            <ul>
              {group.list.map((item) => (
                <li key={item.id} className="flex items-center pt-10 pl-15">
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
        <div className="absolute top-0 left-0 w-full" style={fixedStyle}>
          <div className="h-15 lh-15 pl-10 text-6 text-text-l bg-highlight-bg">
            {fixedTitle}
          </div>
        </div>
      )}
    </Scroll>
  );
};

export default IndexList;
