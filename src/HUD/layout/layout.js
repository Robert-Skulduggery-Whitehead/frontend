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
          name: "Bravado",
          img: "bravado.png",
        },
        right: {
          name: "Bravado",
          img: "bravado.png",
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
                left: "ct",
                right: "t",
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

  render() {
    if (
      Object.keys(this.state.allplayers).length !== 0 ||
      Object.keys(this.state.player).length !== 0 ||
      Object.keys(this.state.map).length !== 0 ||
      Object.keys(this.state.bomb).length !== 0 ||
      Object.keys(this.state.phase_countdowns).length !== 0 ||
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
          />
        </div>
      );
    } else {
      return <h1>Layout</h1>;
    }
  }
}
