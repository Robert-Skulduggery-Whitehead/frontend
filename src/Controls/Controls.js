import React from "react";

let socket = require("socket.io-client")("http://127.0.0.1:3001");

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestOf: "",
      game1: {
        map: "",
        pickedBy: "",
        score: "", //current / 16-12 / tbd
      },
      game2: {},
      game3: {},
      game4: {},
      game5: {},
      game6: {},
      game7: {},
    };
  }

  swapTeams() {
    socket.emit("swapTeams");
  }

  handleChange() {}

  handleSubmit() {}

  render() {
    return (
      //best of x, map picks, map winners,
      <div>
        <form>
          <label>Enter teams</label>
        </form>
        <button onClick={this.swapTeams}>Swap Teams</button>
        <form onSubmit={this.handleSubmit}>
          <label>
            Best of:
            <input
              type="text"
              name="BestOf"
              value={this.state.bestOf || ""}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>Game 1:</label>
          <label>Map</label>
          <input
            type="text"
            name="Game1Map"
            value={this.state.game1.map || ""}
            onChange={this.handleChange}
          ></input>
          <label>Picked By</label>
          <input
            type="text"
            name="Game1Picked"
            value={this.state.game1.pickedBy || ""}
            onChange={this.handleChange}
          ></input>
          <label>Score</label>
          <input
            type="text"
            name="Game1score"
            value={this.state.game1.score || ""}
            onChange={this.handleChange}
          ></input>
        </form>
      </div>
    );
  }
}
