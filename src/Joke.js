import React from "react";
import { Howl } from "howler";
import aha from "./assets/aha.mp3";
import bubble from "./assets/bubble.mp3";
import "./Joke.css";

const bubble1 = new Howl({
  src: bubble,
  volume: 2,
});

const aha1 = new Howl({
  src: aha,
  volume: 0.5,
});

function Joke(props) {
  const getColor = () => {
    switch (true) {
      case props.votes >= 10:
        return "#4CAF50";
      case props.votes >= 8:
        return "#8BC34A";
      case props.votes >= 6:
        return "#CDDC39";
      case props.votes >= 5:
        return "#FFEB3B";
      case props.votes >= 3:
        return "#FFC107";
      case props.votes >= 1:
        return "#FF9800";
      default:
        return "#f44336";
    }
  };

  // const test=(n)=> props.votes >= n

  const getEmoji = () => {
    switch (true) {
      case props.votes >= 10:
        return "em em-rolling_on_the_floor_laughing";
      case props.votes >= 8:
        return "em em-laughing";
      case props.votes >= 6:
        return "em em-smiley";
      case props.votes >= 5:
        return "em em-slightly_smiling_face";
      case props.votes >= 3:
        return "em em-neutral_face";
      case props.votes >= 1:
        return "em em-confused";
      default:
        return "em em-angry";
    }
  };

  const handleClick = (type) => {
    bubble1.play();
    props[type]();
  };

  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i className="fas fa-arrow-up" onClick={() => handleClick("upvote")} />
        <span className="Joke-votes" style={{ borderColor: getColor() }}>
          {props.votes}
        </span>
        <i
          className="fas fa-arrow-down"
          onClick={() => handleClick("downvote")}
        />
      </div>
      <div className="Joke-text">{props.text}</div>
      <div className="Joke-smiley">
        <i className={getEmoji()} onMouseEnter={() => aha1.play()} />
      </div>
    </div>
  );
}

export default Joke;
