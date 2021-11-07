import React from "react";
import Matchbar from "../matchbar/matchbar";
//import Allplayers from "../allplayers/allplayers";
//import LeftTeamPlayers from "../leftTeamPlayers/leftTeamPlayers";
//import RightTeamPlayers from "../rightTeamPlayers/rightTeamPlayers";
//import Map from "../map/map";
//import MapPicks from "../mapPicks/mapPicks";
//import PlayersAlive from "../playersAlive/playersAlive";

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
          img: "ekasiesports.png",
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
            winnerScore: 16,
            loserScore: 7,
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
        if (data.round % 6 === 0 && data.round !== this.state.state.map.round) {
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
        </div>
      );
    } else {
      return <h1>Layout</h1>;
    }
  }
}
