import type {
  IRecommendResult,
  ISingerDetailResult,
  IRecommendAlbumsItem,
} from "./type";
import { get } from "@/service/base";

export function getRecommend() {
  return get<IRecommendResult>("/api/getRecommend");
}

export function getAlbum(album: IRecommendAlbumsItem) {
  return get<ISingerDetailResult>("/api/getAlbum", {
    id: album.id,
  });
}
