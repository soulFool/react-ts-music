import type { ISongResult, IlyricMap, ISingerDetail } from "./type";
import { get } from "./base";

export function processSongs(songs: ISingerDetail[]) {
  if (!songs.length) {
    return Promise.resolve(songs);
  }
  return get<ISongResult>("/api/getSongsUrl", {
    mid: songs.map((song) => {
      return song.mid;
    }),
  }).then((result) => {
    const map = (result as ISongResult).map;
    return songs
      .map((song) => {
        song.url = map[song.mid];
        return song;
      })
      .filter((song) => {
        return song.url && song.url.includes("vkey");
      });
  });
}

const lyricMap: IlyricMap = {};
export function getLyric(song: ISingerDetail) {
  if (song.lyric) {
    return Promise.resolve(song.lyric);
  }
  const mid = song.mid;
  const lyric = lyricMap[mid];
  if (lyric) {
    return Promise.resolve(lyric);
  }

  return get("/api/getLyric", {
    mid,
  }).then((result) => {
    const lyric = result ? result.lyric : "[00:00:00]改歌曲暂时无法获取歌词";
    lyricMap[mid] = lyric;
    return lyric;
  });
}
