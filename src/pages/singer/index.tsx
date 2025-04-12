import type { ISingerGroupItem } from "@/service/type";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { getSingerList } from "@/service/singer";
import useDynamicLoading from "@/hooks/useDynamicLoading";
import IndexList from "@/components/base/indexList";

const Singer = () => {
  const navigate = useNavigate()

  const [currentSinger, setCurrentSinger] = useState<ISingerGroupItem | null>(null);

  const { data: singerList, loading: singerListLoading } =
    useRequest(getSingerList);

  const loadingRef = useDynamicLoading<HTMLDivElement>(singerListLoading);

  function selectSinger(item: ISingerGroupItem) {
    setCurrentSinger(item)
    navigate(`/singer/${item.mid}`)
  }

  return (
    <div ref={loadingRef} className="fixed w-full top-44 bottom-0">
      {singerList?.singers?.length && <IndexList data={singerList.singers} onSelect={selectSinger} />}
      <Outlet context={{singer: currentSinger}} />
    </div>
  );
};

export default Singer;
