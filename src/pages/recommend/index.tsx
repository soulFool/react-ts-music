import { useRequest } from "ahooks";
import { getRecommend } from "@/service/recommend";
import Slider from "@/components/base/slider";
import Scroll from "@/components/base/scroll";
import LazyImage from "@/components/base/lazy-image";
import useDynamicLoading from '@/hooks/useDynamicLoading.tsx'

const Recommend = () => {

  const { data: recommendList, loading: recommendListLoading } = useRequest(getRecommend);

  const loadingRef = useDynamicLoading<HTMLDivElement>(recommendListLoading)

  return (
    <div ref={loadingRef} className="fixed w-full top-44 bottom-0">
      <Scroll className="h-full overflow-hidden">
        <div>
          <div className="relative w-full h-0 pt-4/10 overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              {recommendList?.sliders?.length && (
                <Slider sliders={recommendList?.sliders} />
              )}
            </div>
          </div>
          <div>
            <h1 className="h-[65px] lh-[65px] text-center text-7 text-theme">
              热门歌单推荐
            </h1>
            <ul>
              {recommendList?.albums?.map((item) => (
                <li
                  key={item.id}
                  className="flex box-border items-center p-10 pt-0"
                >
                  <div className="flex-basis-30 w-30 pr-10">
                    <LazyImage width={60} height={60} src={item.pic} />
                  </div>
                  <div className="flex flex-col justify-center flex-1 lh-10 overflow-hidden text-7">
                    <h2 className="mb-5 text-text-primary">{item.username}</h2>
                    <p className="text-text-d">{item.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Scroll>
    </div>
  );
};

export default Recommend;
