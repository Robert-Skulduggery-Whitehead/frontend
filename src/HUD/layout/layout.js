import React from "react";
import AllPlayers from "../allplayers/allplayers";
import Matchbar from "../matchbar/matchbar";
import SpectatedPlayer from "../spectatedPlayer/spectatedPlayer";
import Map from "../map/map";

//import db from 'monk'

let socket = require("socket.io-client")("http://127.0.0.1:3001");

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //data from csgo
      phase_countdowns: {},
      bomb: {},
      grenades: {},
      allplayers: {},
      player: {},
      round: {},
      map: {},
      grenades: {},
      //render?
      render: false,
      //sides
      sides: {
        left: "ct",
        right: "t",
      },
      //team info
      teams: {
        left: {
          name: "bravado",
          img: "bravado.png",
          wins: 1,
        },
        right: {
          name: "ekasi esports",
          img: "ekasi esports.png",
          wins: 1,
        },
      },
      //Series Info (Current map = gameXWinner: "live")
      series: {
        bestOf: 3,
        current: 3,
        games: {
          game1: {
            map: "mirage",
            picked: "bravado",
            winner: "bravado",
            winnerScore: 16,
            loserScore: 7,
          },
          game2: {
            map: "dust",
            picked: "ekasi esports",
            winner: "ekasi esports",
            winnerScore: 16,
            loserScore: 7,
          },
          game3: {
            map: "inferno",
            picked: "decider",
            winner: "",
            winnerScore: "",
            loserScore: "",
          },
        },
      },
    };
  }

  componentDidCatch(error, errorInfo) {
    //
  }

  componentDidMount() {
    socket.on("menu", () => {
      this.setState({
        render: false,
      });
    });

    socket.on("allplayers", (data) => {
      this.setState({
        allplayers: data,
      });
      for (let playerID of Object.keys(data)) {
        if (data[playerID].observer_slot === 1) {
          if (data[playerID].team === "CT") {
            this.setState({
              sides: {
                left: "ct",
                right: "t",
              },
            });
          } else {
            this.setState({
              sides: {
                left: "t",
                right: "ct",
              },
            });
          }
        }
      }
      //Use helper class to get name from database
    });

    socket.on("player", (data) => {
      this.setState({
        player: data,
      });
      //Use helper class to get name from database
    });

    socket.on("map", (data) => {
      if (data.round === 15 && this.state.map.round !== data.round) {
        this.swapTeams();
      }
      if (data.round === 30 && this.state.map.round !== data.round) {
        this.swapTeams();
      }
      if (data.round > 30) {
        if (data.round % 6 === 0 && data.round !== this.state.map.round) {
          this.swapTeams();
        }
      }
      this.setState({
        map: data,
      });
    });

    socket.on("bomb", (data) => {
      this.setState({
        bomb: data,
      });
    });

    socket.on("phase_countdowns", (data) => {
      this.setState({
        phase_countdowns: data,
      });
    });

    socket.on("round", (data) => {
      this.setState({
        round: data,
      });
    });

    socket.on("grenades", (data) => {
      this.setState({
        grenades: data,
      });
    });

    socket.on("swapTeams", () => {
      this.swapTeams();
    });

    socket.on("getTeams", (teams) => {
      this.setState({
        teams: {
          left: teams[0],
          right: teams[1],
        },
      });
    });

    socket.on("getSeriesInfo", (seriesInfo) => {
      this.setState({
        series: {
          bestOf: seriesInfo[0],
          games: seriesInfo[1],
        },
      });
      let tempTeams = this.state.teams;
      let tempCurrent = 1;
      for (let game in this.state.games) {
        if (this.state.games[game].winner === this.state.teams.left.name) {
          tempTeams.left.wins = tempTeams.left.wins + 1;
          tempCurrent++;
        } else if (
          this.state.games[game].winner === this.state.teams.right.name
        ) {
          tempTeams.right.wins = tempTeams.right.wins + 1;
          tempCurrent++;
        }
      }
      let tempSeries = this.state.series;
      tempSeries.current = tempCurrent;
      this.setState({
        teams: tempTeams,
        series: tempSeries,
      });
    });
  }

  swapTeams() {
    let tempRight = this.state.teams.left;
    let tempLeft = this.state.teams.right;
    this.setState({
      teams: {
        left: tempLeft,
        right: tempRight,
      },
    });
  }

  render() {
    if (
      Object.keys(this.state.allplayers).length !== 0 &&
      Object.keys(this.state.player).length !== 0 &&
      Object.keys(this.state.map).length !== 0 &&
      Object.keys(this.state.bomb).length !== 0 &&
      Object.keys(this.state.phase_countdowns).length !== 0 &&
      Object.keys(this.state.round).length !== 0
    ) {
      return (
        <div>
          <Map
            allplayers={this.state.allplayers}
            map={this.state.map}
            bomb={this.state.bomb}
            player={this.state.player}
            grenades={this.state.grenades}
          ></Map>
          <AllPlayers
            allplayers={this.state.allplayers}
            teams={this.state.teams}
            map={this.state.map}
            sides={this.state.sides}
            bomb={this.state.bomb}
            round={this.state.round}
          ></AllPlayers>
          <Matchbar
            allplayers={this.state.allplayers}
            map={this.state.map}
            bomb={this.state.bomb}
            phase_countdowns={this.state.phase_countdowns}
            round={this.state.round}
            sides={this.state.sides}
            teams={this.state.teams}
            series={this.state.series}
          />
          <SpectatedPlayer
            player={this.state.player}
            teams={this.state.teams}
            sides={this.state.sides}
            bomb={this.state.bomb}
          ></SpectatedPlayer>
        </div>
      );
    } else {
      return <h1>Layout</h1>;
    }
  }
}
