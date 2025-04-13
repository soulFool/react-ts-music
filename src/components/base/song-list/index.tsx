import type { ISingerDetail } from "@/service/type";

type Props = {
  songs: ISingerDetail[]; 
}

const SongList = ({ songs }: Props) => {
  const getDesc = (song: ISingerDetail) => {
    return `${song.singer}·${song.album}`
  }

  return (
    <ul>
      {songs.map(song => (
        <li key={song.id} className="flex items-center box-border h-32 text-7">
        <div className="flex-1 lh-10 overflow-hidden">
          <h2 className="truncate text-text-primary">{ song.name }</h2>
          <p className="truncate mt-2 text-text-d">{ getDesc(song) }</p>
        </div>
        </li>
      ))}
    </ul>
  )

}

export default SongList;