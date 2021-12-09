import React from "react";
import "./Controls.css";

let socket = require("socket.io-client")("http://127.0.0.1:3001");

export default class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Get teams from database (socket) and make team names drop down / text edit
      // Even add differnt option for adding team to database
      // Get teams from imgs in folder already
      teams: {},
      bestOf: 0,
      bestOfArray: [],
      games: {
        game1: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
        game2: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
        game3: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
        game4: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
        game5: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
        game6: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
        game7: {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        },
      },
      teamLeft: {
        name: null,
        img: null,
      },
      teamRight: {
        name: null,
        img: null,
      },
      teamsSet: false,
    };
  }

  componentDidMount() {
    socket.on("getTeams", (teams) => {
      this.setState({
        teamLeft: teams[0],
        teamRight: teams[1],
        teamsSet: true,
      });
    });

    socket.on("swapTeams", () => {
      let right = this.state.teamLeft;
      let left = this.state.teamRight;
      this.setState({
        teamLeft: left,
        teamRight: right,
      });
    });

    socket.on("getSeriesInfo", (seriesInfo) => {
      this.setState({
        bestOf: seriesInfo[0],
        games: seriesInfo[1],
        bestOfArray: Array.apply(null, Array(parseInt(seriesInfo[0]) || 0)),
      });
    });
  }

  swapTeams() {
    socket.emit("swapTeams");
  }

  setTeams() {
    socket.emit("setTeams", [this.state.teamLeft, this.state.teamRight]);
    this.setState({
      teamsSet: true,
    });
  }

  setSeriesInfo() {
    let temp = this.state.games;
    for (let game in temp) {
      if (parseInt(game.substring(4, 5)) > this.state.bestOf) {
        temp[game] = {
          map: "",
          picked: "",
          winner: "",
          winnerScore: "",
          loserScore: "",
        };
      }
    }
    this.setState({
      games: temp,
    });
    socket.emit("setSeriesInfo", [this.state.bestOf, this.state.games]);
  }

  handleChangeTeamLeft = (event) => {
    this.setState({
      teamLeft: {
        name: event.target.value,
        img: event.target.value + ".png",
      },
    });
  };

  handleChangeTeamRight = (event) => {
    this.setState({
      teamRight: {
        name: event.target.value,
        img: event.target.value + ".png",
      },
    });
  };

  handleChangeBestOf = (event) => {
    if (
      event.target.value === "1" ||
      event.target.value === "3" ||
      event.target.value === "5" ||
      event.target.value === "7" ||
      event.target.value === ""
    ) {
      this.setState({
        bestOf: event.target.value,
        bestOfArray: [],
      });
      this.setState({
        bestOfArray: Array.apply(
          null,
          Array(parseInt(event.target.value) || 0)
        ),
      });
    }

    /*for (let i = 1; i <= event.target.value; i++) {
      this.setState({
        ["game" + i]: {},
      });
    }*/
  };

  handleChange = (name) => (event) => {
    let games = this.state.games;
    let temp = this.state[name.substr(0, 5)];
    games[name.substr(0, 5)][name.substr(5, name.length - 5)] =
      event.target.value;
    this.setState({
      games: games,
    });
  };

  handleSubmit() {}

  render() {
    return (
      //best of x, map picks, map winners,
      <div class="controlsContainer">
        <form class="teamsForm">
          <h4>Enter teams</h4>
          <label>
            Left Team name
            <input
              type="text"
              name="teamLeftName"
              value={this.state.teamLeft.name || ""}
              onChange={this.handleChangeTeamLeft}
            ></input>
          </label>
          <label>
            Right Team name
            <input
              type="text"
              name="teamLeftName"
              value={this.state.teamRight.name || ""}
              onChange={this.handleChangeTeamRight}
            ></input>
          </label>
          <button
            onClick={(e) => {
              e.preventDefault();
              this.setTeams(e);
            }}
          >
            Set Teams
          </button>
        </form>
        {this.state.teamsSet && (
          <div>
            <hr class="line" />

            <button onClick={this.swapTeams}>Swap Teams</button>

            <hr class="line" />

            <form onSubmit={this.handleSubmit}>
              <h4>Game Info</h4>
              <label>
                Best of:
                <input
                  type="text"
                  name="BestOf"
                  value={this.state.bestOf || ""}
                  onChange={this.handleChangeBestOf}
                ></input>
              </label>
              <hr class="line" />
              {this.state.bestOfArray.map((x, i) => (
                <div>
                  <h5>{"Game " + (i + 1)}:</h5>
                  <label>Map</label>
                  <input
                    type="text"
                    name="GameMap"
                    value={this.state.games["game" + (i + 1)].map || ""}
                    onChange={this.handleChange("game" + (i + 1) + "map")}
                  ></input>
                  <label>Picked By</label>
                  <input
                    type="text"
                    name="GamePicked"
                    value={this.state.games["game" + (i + 1)].picked || ""}
                    onChange={this.handleChange("game" + (i + 1) + "picked")}
                  ></input>
                  <label>Winner</label>
                  <input
                    type="text"
                    name="Winner"
                    value={this.state.games["game" + (i + 1)].winner || ""}
                    onChange={this.handleChange("game" + (i + 1) + "winner")}
                  ></input>
                  <label>Winner Score</label>
                  <input
                    type="text"
                    name="Winner Score"
                    value={this.state.games["game" + (i + 1)].winnerScore || ""}
                    onChange={this.handleChange(
                      "game" + (i + 1) + "winnerScore"
                    )}
                  ></input>
                  <label>Loser Score</label>
                  <input
                    type="text"
                    name="Loser Score"
                    value={this.state.games["game" + (i + 1)].loserScore || ""}
                    onChange={this.handleChange(
                      "game" + (i + 1) + "loserScore"
                    )}
                  ></input>
                </div>
              ))}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.setSeriesInfo(e);
                }}
              >
                Set Series Info
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
