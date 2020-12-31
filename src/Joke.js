import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  getColor() {
    if (this.props.votes >= 10) {
      return "#4CAF50";
    } else if (this.props.votes >= 8) {
      return "#8BC34A";
    } else if (this.props.votes >= 6) {
      return "#CDDC39";
    } else if (this.props.votes >= 5) {
      return "#FFEB3B";
    } else if (this.props.votes >= 3) {
      return "#FFC107";
    } else if (this.props.votes >= 1) {
      return "#FF9800";
    } else {
      return "#f44336";
    }
  }
  getEmoji() {
    if (this.props.votes >= 10) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.votes >= 8) {
      return "em em-laughing";
    } else if (this.props.votes >= 6) {
      return "em em-smiley";
    } else if (this.props.votes >= 5) {
      return "em em-slightly_smiling_face";
    } else if (this.props.votes >= 3) {
      return "em em-neutral_face";
    } else if (this.props.votes >= 1) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }
  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.props.upvote} />
          <span className="Joke-votes" style={{ borderColor: this.getColor() }}>
            {this.props.votes}
          </span>
          <i className="fas fa-arrow-down" onClick={this.props.downvote} />
        </div>

        <div className="Joke-text">{this.props.text}</div>
        <div className="Joke-smiley">
          <i className={this.getEmoji()} />
        </div>
      </div>
    );
  }
}
export default Joke;
