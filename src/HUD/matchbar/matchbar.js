import React from "react";
import "./matchbar.css";
import Timer from "./timer/timer";
import Team from "./team/team";
import GameInfo from "./gameInfo/gameInfo";
import SeriesInfo from "./seriesInfo/seriesInfo";
export default class Matchbar extends React.Component {
  constructor(props) {
    //props: allplayers, map, bomb, phase_countdowns, round, sides, teams, series
    super(props);
    this.state = {};
  }

  componentDidCatch(error, errorInfo) {
    //
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <SeriesInfo
          series={this.props.series}
          teams={this.props.teams}
          round={this.props.round}
        ></SeriesInfo>
        <GameInfo
          series={this.props.series}
          teams={this.props.teams}
          sides={this.props.sides}
          round={this.props.map.round}
        ></GameInfo>
        <Team
          class={"teamLeft"}
          team={this.props.teams.left}
          bomb={this.props.bomb}
          allplayers={this.props.allplayers}
          map={this.props.map}
          side={this.props.sides.left}
        ></Team>
        <Team
          class={"teamRight"}
          team={this.props.teams.right}
          bomb={this.props.bomb}
          allplayers={this.props.allplayers}
          map={this.props.map}
          side={this.props.sides.right}
        ></Team>
        <Timer
          phase_countdowns={this.props.phase_countdowns}
          bomb={this.props.bomb}
          round={this.props.round}
        ></Timer>
      </div>
    );
  }
}
