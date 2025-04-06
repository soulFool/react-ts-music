import { useRequest } from "ahooks";
import { getSingerList } from "@/service/singer";
import { useRef } from "react";
import useDynamicLoading from "@/hooks/useDynamicLoading";
import IndexList from "@/components/base/indexList";

const Singer = () => {
  const loadingRef = useRef<HTMLDivElement>(null);

  const { data: singerList, loading: singerListLoading } =
    useRequest(getSingerList);

  useDynamicLoading(loadingRef, singerListLoading);

  return (
    <div ref={loadingRef} className="fixed w-full top-44 bottom-0">
      {singerList?.singers?.length && <IndexList data={singerList.singers} />}
    </div>
  );
};

export default Singer;
