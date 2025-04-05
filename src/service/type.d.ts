export interface IResponseResult<T = any> {
  code: number;
  result: T;
}

export interface IRecommendResult {
  albums: IRecommendAlbumsItem[];
  sliders: IRecommendSlidersItem[];
}

export interface ISingerListResult {
  singers: ISingerGroup[];
}

export interface ISingerDetailResult {
  songs: ISingerDetail[];
}

export interface ISongResult {
  map: any;
}

export interface IlyricMap {
  [key: string]: string;
}

export interface ITopListResult {
  topList: ITopListItem[];
}

export interface IHotKeysResult {
  hotKeys: IHotKeys[];
}

export interface IHotKeys {
  key: string;
  id: number;
}

export interface ISearchResult {
  hasMore: boolean;
  singer: ISingerGroupItem;
  songs: ISingerDetail[];
}

export interface IRecommendAlbumsItem {
  id: number;
  pic: string;
  username: string;
  title: string;
}

export interface IRecommendSlidersItem {
  id: number;
  link: string;
  pic: string;
}

export interface ISingerGroup {
  title: string;
  list: ISingerGroupItem[];
}

export interface ISingerGroupItem {
  id: number;
  mid: string;
  name: string;
  pic: string;
}

export interface ISingerDetail {
  album: string;
  duration: number;
  id: number;
  mid: string;
  name: string;
  pic: string;
  singer: string;
  url: string;
  lyric?: string;
}

export interface ITopListItem {
  id: number;
  name: string;
  period: string;
  pic: string;
  songList: ITopListSongItem[];
}

export interface ITopListSongItem {
  id: number;
  singerName: string;
  songName: string;
}

export interface ISongListSelectItem {
  song: ISingerDetail;
  index: number;
}
