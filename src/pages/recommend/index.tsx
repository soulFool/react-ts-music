import { useRequest } from "ahooks";
import { getRecommend } from "@/service/recommend";
import Slider from "@/components/base/slider";

const Recommend = () => {
  const { data: recommendList } = useRequest(getRecommend);

  return (
    <div className="fixed w-full top-44 bottom-0">
      <div className="relative w-full h-0 pt-4/10 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {recommendList?.sliders?.length && (
            <Slider sliders={recommendList?.sliders} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
