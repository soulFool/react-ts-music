import type {
  ISingerListResult,
  ISingerDetailResult,
  ISingerGroupItem,
} from "./type";
import { get } from "./base";

export function getSingerList() {
  return get<ISingerListResult>("/api/getSingerList");
}

export function getSingerDetail(singer: ISingerGroupItem) {
  return get<ISingerDetailResult>("/api/getSingerDetail", {
    mid: singer.mid,
  });
}
