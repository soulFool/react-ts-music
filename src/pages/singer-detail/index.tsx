import type { ISingerGroupItem } from "@/service/type";
import { useRequest } from "ahooks";
import { useOutletContext } from "react-router-dom";
import { getSingerDetail } from "@/service/singer";
import { processSongs } from "@/service/songer";
import MusicList from "@/components/music-list";

type ContextType = {
  singer: ISingerGroupItem;
};

const SingerDetail = () => {
  const { singer } = useOutletContext<ContextType>();

  const { data: singerDetail } = useRequest(() => getSingerDetail(singer));
  const { data: songs, loading: songsLoading } = useRequest(
    () => processSongs(singerDetail?.songs ?? []),
    {
      ready: !!singerDetail?.songs,
      refreshDeps: [singerDetail],
    }
  );

  return <div className="fixed z-10 inset-0 bg-bg-primary">
    <MusicList songs={songs ?? []} pic={singer.pic} title={singer.name} loading={songsLoading}></MusicList>
  </div>;
};

export default SingerDetail;
