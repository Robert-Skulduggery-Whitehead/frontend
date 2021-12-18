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
      hudToggle: "hidden",
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

    socket.on("getToggleHUD", () => {
      if (this.state.hudToggle === "showing") {
        this.setState({
          toggleHUD: "hidden",
        });
      } else {
        this.setState({
          toggleHUD: "showing",
        });
      }
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
    games[name.substr(0, 5)][name.substr(5, name.length - 5)] =
      event.target.value;
    this.setState({
      games: games,
    });
  };

  toggleHud() {
    socket.emit("toggleHUD");
  }

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

        <div class="controlsControlsContainer">
          <h4>Controls</h4>
          <button class onClick={this.swapTeams}>
            Swap Teams
          </button>
          <button class onClick={this.toggleHud}>
            {this.state.hudToggle === "hidden" && <span>Show HUD</span>}
            {this.state.hudToggle === "showing" && <span>Hide HUD</span>}
          </button>
        </div>

        {this.state.teamsSet && (
          <form class="controlsGamesContainer" onSubmit={this.handleSubmit}>
            <div>
              <h4>Game Info</h4>
              <select
                id="bestOf"
                name="bestOf"
                onChange={this.handleChangeBestOf}
              >
                <option value="">Best Of</option>
                <option value="1">Best Of 1</option>
                <option value="3">Best Of 3</option>
                <option value="5">Best Of 5</option>
              </select>
            </div>
            <div class="controlsGamesGameContainer">
              {this.state.bestOfArray.map((x, i) => (
                <div class="controlsGame">
                  <h5>{"Game " + (i + 1)}:</h5>
                  <select
                    id="map"
                    name="GameMapSelect"
                    onChange={this.handleChange("game" + (i + 1) + "map")}
                  >
                    <option value="">Select a map</option>
                    <option value="vertigo">Vertigo</option>
                    <option value="mirage">Mirage</option>
                    <option value="inferno">Inferno</option>
                    <option value="overpass">Overpass</option>
                    <option value="nuke">Nuke</option>
                    <option value="dust2">Dust2</option>
                    <option value="ancient">Ancient</option>
                  </select>
                  <select
                    id="teamPicked"
                    name="teamPicked"
                    onChange={this.handleChange("game" + (i + 1) + "picked")}
                  >
                    <option value="">Team that picked map</option>
                    <option value={this.state.teamLeft.name}>
                      {this.state.teamLeft.name}
                    </option>
                    <option value={this.state.teamRight.name}>
                      {this.state.teamRight.name}
                    </option>
                    <option value="Decider">Decider</option>
                  </select>
                  <select
                    id="teamWinner"
                    name="teamWinner"
                    onChange={this.handleChange("game" + (i + 1) + "winner")}
                  >
                    <option value="">Winner</option>
                    <option value={this.state.teamLeft.name}>
                      {this.state.teamLeft.name}
                    </option>
                    <option value={this.state.teamRight.name}>
                      {this.state.teamRight.name}
                    </option>
                    <option value="current">Currently playing</option>
                    <option value="tbp">Upcoming</option>
                  </select>

                  <br />
                  <br />
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
            </div>
            {this.state.bestOf !== 0 && this.state.bestOf !== "" && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.setSeriesInfo(e);
                }}
              >
                Set Series Info
              </button>
            )}
          </form>
        )}
      </div>
    );
  }
}
