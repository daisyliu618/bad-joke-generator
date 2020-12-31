import React, { Component } from "react";
import Joke from "./Joke";
import IconPlayer from "./IconPlayer";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 1,
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false,
    };
    this.seenJokes = new Set(this.state.jokes.map((j) => j.text));
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }

  async getJokes() {
    try {
      let jokes = [];
      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        let newJoke = res.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({ id: uuidv4(), text: newJoke, votes: 0 });
        } else {
          console.log("FOUND A DUPLICATE!");
        }
      }
      this.setState(
        (st) => ({
          loading: false,
          jokes: [...st.jokes, ...jokes],
        }),
        () =>
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }

  handleVote(id, delta) {
    this.setState(
      (st) => ({
        jokes: st.jokes
          .map((j) => {
            const voteVal = j.votes + delta;
            if (j.id === id && voteVal < 0) {
              return null;
            }
            return j.id === id ? { ...j, votes: voteVal } : j;
          })
          .filter((i) => i !== null),
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  handleClick() {
    this.setState({ loading: true }, this.getJokes);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="JokeList-title">Loading...</h1>
        </div>
      );
    }


    // setTimeout(function(){ 
    //   let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes); }, 3000);

    let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
    
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            Bad Joke <span>Generator</span>
          </h1>
          <IconPlayer />
          <button className="JokeList-getmore" onClick={this.handleClick}>
            Generate
          </button>
        </div>

        <div className="JokeList-jokes">
          {jokes.map((j) => (
            <Joke
              key={j.id}
              votes={j.votes}
              text={j.text}
              upvote={() => this.handleVote(j.id, 1)}
              downvote={() => this.handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default JokeList;
