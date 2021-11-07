import React from "react";
import "./matchbar.css";
import Timer from "./timer";
import Team from "./team";
import GameInfo from "./gameInfo";
import SeriesInfo from "./seriesInfo";
export default class Matchbar extends React.Component {
  constructor(props) {
    //props: allplayers, map, bomb, phase_countdowns, round, sides, teams, series
    super(props);
    this.state = {
      //Equipment values for sides
      leftEquipValue: 0,
      rightEquipValue: 0,
      //Loss bonus for teams
      leftLossBonus: 0,
      rightLossBonus: 0,
    };
  }

  componentDidCatch(error, errorInfo) {
    //
  }

  componentDidMount() {
    //Equipment values for teams
    //let leftE, rightE;
    /*for (let key of Object.keys(this.state.allplayers)) {
      if (
        this.state.allplayers[key].team === this.state.sides.left.toUpperCase()
      ) {
        leftE = leftE + this.state.allplayers[key].state.equip_value;
      } else {
        rightE = rightE + this.state.allplayers[key].state.equip_value;
      }
    }
    this.setState({
      leftEquipValue: leftE,
      rightEquipValue: rightE,
    });

    if (this.state.sides.left == "ct") {
      if (this.state.map.team_ct.consecutive_round_losses == 1) {
        this.state.leftLossBonus = "1900";
      } else if (this.state.map.team_ct.consecutive_round_losses == 2) {
        this.state.leftLossBonus = "2400";
      } else if (this.state.map.team_ct.consecutive_round_losses == 3) {
        this.state.leftLossBonus = "2900";
      } else if (this.state.map.team_ct.consecutive_round_losses >= 4) {
        this.state.leftLossBonus = "3400";
      }

      if (this.state.map.team_t.consecutive_round_losses == 1) {
        this.state.rightLossBonus = "1900";
      } else if (this.state.map.team_t.consecutive_round_losses == 2) {
        this.state.rightLossBonus = "2400";
      } else if (this.state.map.team_t.consecutive_round_losses == 3) {
        this.state.rightLossBonus = "2900";
      } else if (this.state.map.team_t.consecutive_round_losses >= 4) {
        this.state.rightLossBonus = "3400";
      }
    } else {
      if (this.state.map.team_ct.consecutive_round_losses == 1) {
        this.state.rightLossBonus = "1900";
      } else if (this.state.map.team_ct.consecutive_round_losses == 2) {
        this.state.rightLossBonus = "2400";
      } else if (this.state.map.team_ct.consecutive_round_losses == 3) {
        this.state.rightLossBonus = "2900";
      } else if (this.state.map.team_ct.consecutive_round_losses >= 4) {
        this.state.rightLossBonus = "3400";
      }

      if (this.state.map.team_t.consecutive_round_losses == 1) {
        this.state.leftLossBonus = "1900";
      } else if (this.state.map.team_t.consecutive_round_losses == 2) {
        this.state.leftLossBonus = "2400";
      } else if (this.state.map.team_t.consecutive_round_losses == 3) {
        this.state.leftLossBonus = "2900";
      } else if (this.state.map.team_t.consecutive_round_losses >= 4) {
        this.state.leftLossBonus = "3400";
      }
    }*/
    /*<Timer
          round={this.props.round}
          bomb={this.props.bomb}
          phase_countdowns={this.props.phase_countdowns}
        ></Timer>*/
  }

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
