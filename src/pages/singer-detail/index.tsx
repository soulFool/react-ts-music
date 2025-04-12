import type { ISingerGroupItem } from "@/service/type";
import { useRequest } from "ahooks";
import { useOutletContext } from "react-router-dom";
import { getSingerDetail } from "@/service/singer";
import { processSongs } from '@/service/songer'

type ContextType = {
  singer: ISingerGroupItem;
}

const SingerDetail = () => {
  const { singer } = useOutletContext<ContextType>();
  console.log(singer)

  const { data: singerDetail } =
    useRequest(() => getSingerDetail(singer));
  const { data: songList } =
    useRequest(() =>  processSongs(singerDetail?.songs ?? []), {
      ready: !!singerDetail?.songs,
      refreshDeps:[singerDetail]
    });

  return <div className="fixed z-10 inset-0 bg-bg-primary">歌手详情</div>;
};

export default SingerDetail;
