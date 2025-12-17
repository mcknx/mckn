import type { MusicData } from "~/types";

const playlist: MusicData[] = [
  {
    title: "Sunrise",
    artist: "xantesia",
    cover: "https://i.scdn.co/image/ab67616d0000b2736c9ff453f39bcb3de02c1117",
    audio: "music/sunrise.mp3"
  },
  {
    title: "Sunflower",
    artist: "Post Malone / Swae Lee",
    cover: "//p1.music.126.net/z0IO1vEsowL9mD_5yzUjeA==/109951163936068098.jpg",
    audio: "music/sunflower.mp3"
  }
];

// Default to first song (sunrise)
const music: MusicData = playlist[0];

export { playlist };
export default music;
