import React from "react";
import "./Controls.css";

let socket = require("socket.io-client")("http://127.0.0.1:3001");

export default class AddPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allplayers: {},
      updatedPlayers: {},
    };
  }

  componentDidUpdate() {
    if (Object.keys(this.state.updatedPlayers).length === 0) {
      this.state.updatedPlayers = this.state.allplayers;
    }
  }

  componentDidMount() {
    socket.on("allplayers", (allplayers) => {
      this.setState({
        allplayers: allplayers,
      });
    });
  }

  handleChange = (name) => (event) => {
    let temp = this.state.updatedPlayers;
    temp[name].name = event.target.value;
    this.setState({
      updatedPlayers: temp,
    });
  };

  updatePlayerName(data) {
    socket.emit("updatePlayer", [
      data[0],
      this.state.updatedPlayers[data[0]].name,
    ]);
  }

  render() {
    return (
      <div class="addPlayersContainer">
        {Object.keys(this.state.updatedPlayers).map((playerID) => {
          return (
            <form class="addPlayersForm">
              <h4>Player {playerID}</h4>
              <label>
                Current Name: {this.state.allplayers[playerID].name}
              </label>
              <label>New Name:</label>
              <input
                type="text"
                name="playerNameChange"
                value={this.state.updatedPlayers[playerID].name}
                onChange={this.handleChange(playerID)}
              ></input>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.updatePlayerName([playerID, e]);
                }}
              >
                Update Player Name
              </button>
            </form>
          );
        })}
      </div>
    );
  }
}
