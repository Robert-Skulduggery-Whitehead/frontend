import React from "react";
import "./economyBar.css";

export default class EconomyBar extends React.Component {
  constructor(props) {
    //props: allplayers, team, side, map
    super(props);
    this.state = {
      consecutiveLoss: 0,
      lossBonus: "$0",
      equipValue: "$0",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.allplayers !== prevProps.allplayers) {
      let temp = 0;
      for (let playerID of Object.keys(this.props.allplayers)) {
        if (
          this.props.allplayers[playerID].team === this.props.team.toUpperCase()
        ) {
          temp += this.props.allplayers[playerID].state.equip_value;
        }
      }
      this.setState({
        equipValue: "$" + temp,
      });
    }
    if (this.props.round.phase === "freezetime") {
      if (this.props.team === "ct") {
        if (
          this.state.consecutiveLoss !==
          this.props.map.team_ct.consecutive_round_losses
        ) {
          this.state.consecutiveLoss =
            this.props.map.team_ct.consecutive_round_losses;
          console.log(this.state.consecutiveLoss);
          this.setLossBonus(this.props.map.team_ct.consecutive_round_losses);
        }
      } else {
        if (
          this.state.consecutiveLoss !==
          this.props.map.team_t.consecutive_round_losses
        ) {
          this.state.consecutiveLoss =
            this.props.map.team_t.consecutive_round_losses;
          console.log(this.state.consecutiveLoss);
          this.setLossBonus(this.props.map.team_t.consecutive_round_losses);
        }
      }
    }
  }

  componentDidMount() {}

  setLossBonus(consecLoss) {
    if (consecLoss === 0) {
      this.setState({
        lossBonus: "$1400",
      });
    } else if (consecLoss === 1) {
      this.setState({
        lossBonus: "$1900",
      });
    } else if (consecLoss === 2) {
      this.setState({
        lossBonus: "$2400",
      });
    } else if (consecLoss === 3) {
      this.setState({
        lossBonus: "$2900",
      });
    } else if (consecLoss === 4) {
      this.setState({
        lossBonus: "$3400",
      });
    } else if (consecLoss === 5) {
      this.setState({
        lossBonus: "$3400",
      });
    }
  }

  render() {
    if (this.props.round.phase === "freezetime") {
      return (
        <div
          class={"economyBarContainer economyBarContainer" + this.props.side}
        >
          <div class="economyBarTeamLogoContainer">
            <img
              class={"economyBarTeamLogo"}
              src={
                "./svgs/logo_" + this.props.team.toUpperCase() + "_default.png"
              }
              alt=""
            ></img>
          </div>
          <div class="economyBarLossBonusDotsContainer">
            <div
              class={
                this.state.consecutiveLoss >= 1
                  ? "economyBarLossBonusDot " + this.props.team + "Dot"
                  : "economyBarLossBonusDot"
              }
            ></div>
            <div
              class={
                this.state.consecutiveLoss >= 2
                  ? "economyBarLossBonusDot " + this.props.team + "Dot"
                  : "economyBarLossBonusDot"
              }
            ></div>
            <div
              class={
                this.state.consecutiveLoss >= 3
                  ? "economyBarLossBonusDot " + this.props.team + "Dot"
                  : "economyBarLossBonusDot"
              }
            ></div>
            <div
              class={
                this.state.consecutiveLoss >= 4
                  ? "economyBarLossBonusDot " + this.props.team + "Dot"
                  : "economyBarLossBonusDot"
              }
            ></div>
            <div
              class={
                this.state.consecutiveLoss === 5
                  ? "economyBarLossBonusDot " + this.props.team + "Dot"
                  : "economyBarLossBonusDot"
              }
            ></div>
          </div>
          <div class="economyBarLossBonusContainer">
            <div class="economyBarLossBonus">{this.state.lossBonus}</div>
            <div class={"economyBarLossBonusText " + this.props.team}>
              Loss Bonus
            </div>
          </div>
          <div class="economyBarEquipValueContainer">
            <div class="economyBarEquipValue">{this.state.equipValue}</div>
            <div class={"economyBarEquipValueText " + this.props.team}>
              Equipment Value
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
