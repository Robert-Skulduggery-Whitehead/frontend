import React from "react";
import Matchbar from "../matchbar/matchbar";
import Allplayers from "../allplayers/allplayers";
import LeftTeamPlayers from "../leftTeamPlayers/leftTeamPlayers";
import RightTeamPlayers from "../rightTeamPlayers/rightTeamPlayers";
import Map from "../map/map";
import MapPicks from "../mapPicks/mapPicks";
import PlayersAlive from "../playersAlive/playersAlive";

//import db from 'monk'

let socket = require("socket.io-client")("http://127.0.0.1:3001");

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phase_countdowns: {},
      bomb: {},
      grenades: {},
      allplayers: {},
      player: {},
      round: {},
      map: {},
      render: false,
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

    socket.on("allplayers", (allplayers) => {
      this.setState({
        allplayers: allplayers,
      });
    });

    socket.on("player", (player) => {
      this.setState({
        player: player,
      });
    });

    socket.on("map", (map) => {
      this.setState({
        map: map,
      });
    });
  }

  render() {
    if (this.state.render) {
      return (
        <div>
          <Matchbar />
          <LeftTeamPlayers></LeftTeamPlayers>
        </div>
      );
    } else {
      return <h1>Layout</h1>;
    }
  }
}
