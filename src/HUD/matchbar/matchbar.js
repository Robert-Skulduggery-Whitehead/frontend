import React from "react";
import "./matchbar.css";
import Timer from "easytimer.js";
import GameInfo from "./gameInfo";

export default class Matchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //props start
      allplayers: this.props.allPlayers,
      map: this.props.map,
      bomb: this.props.bomb,
      phase_countdowns: this.props.phase_countdowns,
      round: this.props.round,
      sides: this.props.sides, //.left and .right = ct/t
      teams: this.props.teams,
      //Equipment values for sides
      leftEquipValue: 0,
      rightEquipValue: 0,
      //Bomb state
      bombPlanted: false,
      bombDefused: false,
      bombTimer: 0,
      defuseTimer: 0,
      plantTimer: new Timer(),
      plantedPercentage: 100,
      plantingPercentage: 100,
      defusingPercentage: 100,
      defuseState: false,
      defuseTime: 10,
      //Loss bonus for teams
      leftLossBonus: 0,
      rightLossBonus: 0,
      //Phase countdown
      phaseCountdown: "",
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
    }

    if (!this.state.bombPlanted && this.state.bomb.state === "planted") {
      this.state.plantTimer.start({
        countdown: true,
        startValues: { seconds: 40 },
        precision: "secondTenths",
      });
      this.state.plantTimer.addEventListener("secondsUpdated", () => {
        let time = this.state.plantTimer.getTimeValues().seconds;
        let percentage = (time / 40) * 100;
        this.setState({
          plantedPercentage: percentage,
        });
      });
      this.setState({
        bombPlanted: true,
        defuseState: false,
      });
    }

    if (
      this.state.bomb.state === "defused" ||
      this.state.bomb.state === "dropped" ||
      this.state.bomb.state === "carried"
    ) {
      this.state.plantTimer.reset();
      this.setState({
        bombPlanted: false,
        defuseState: false,
      });
    }

    if (this.state.bomb.state === "defusing") {
      if (this.state.bomb.countdown <= 5) {
        this.setState({
          defuseState: true,
          defuseTime: 5,
        });
      } else {
        this.setState({
          defuseState: true,
          defuseTime: 10,
        });
      }
      this.setState({
        defusingPercentage:
          (this.state.bomb.countdown / this.state.defuseTime) * 100,
      });
    }

    if (this.state.bomb.state === "planting") {
      this.setState({
        plantingPercentage: (this.state.bomb.countdown / 3) * 100,
      });
    }

    if (this.state.round.phase == "over") {
      this.setState({
        bombPlanted: false,
        bombDefused: false,
      });
    }

    let min = 0;
    let seconds = 0;
    let time = this.state.phase_countdowns.phase_ends_in;

    while (time >= 60) {
      min += 1;
      time -= 60;
    }
    seconds = Math.round(time);

    if (seconds < 10) {
      this.setState({
        phaseCountdown: min.toString() + ":0" + seconds.toString(),
      });
    } else {
      this.setState({
        phaseCountdown: "0" + min.toString() + ":" + seconds.toString(),
      });
    }*/
  }

  render() {
    return <GameInfo></GameInfo>;
  }
}
