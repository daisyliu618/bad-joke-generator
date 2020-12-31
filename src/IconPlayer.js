import React from "react";
import useSound from "use-sound";
import songs from "./assets/songs.mp3";
import icon from "./assets/play.svg";

function IconPlayer() {
  const [play, { stop, isPlaying }] = useSound(songs);

  const toggleSong = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  return <img src={icon} alt="laugh" onClick={() => toggleSong()} />;
}

export default IconPlayer;
