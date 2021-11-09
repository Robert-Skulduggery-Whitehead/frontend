import React from "react";
import "./playerAlive.css";

export default class PlayerAlive extends React.Component {
  constructor(props) {
    //props: team, side, player, teamLogo
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <div
        class={"playerAliveContainer playerAliveContainer" + this.props.side}
      >
        <div class={"playerAliveImageContainer"}>
          {this.props.player.image === "" && (
            <img
              class="playerAliveImage"
              src={"./teamImages/" + this.props.teamLogo}
            ></img>
          )}
          {this.props.player.image !== "" && (
            <img
              class="playerAliveImage"
              src={"./playerImages/" + this.props.player.image}
            ></img>
          )}
        </div>
        <div class={"playerAliveHealthContainer " + this.props.team + "Shadow"}>
          <div class="playerAliveHealth">{this.props.player.state.health}</div>
        </div>
        <div class="playerAliveRestContainer">
          <div
            class={
              "playerAliveTopContainer playerAliveTopContainer" +
              this.props.side
            }
          >
            <div class={"playerAliveName playerAliveName" + this.props.side}>
              {this.props.player.name}
            </div>
            <div class="playerAliveKDA">
              <span class="gray">K</span>
              <span class={this.props.team}>
                {this.props.player.match_stats.kills}
              </span>{" "}
              <span class="gray">A</span>
              <span class={this.props.team}>
                {this.props.player.match_stats.assists}
              </span>{" "}
              <span class="gray">D</span>
              <span class={this.props.team}>
                {this.props.player.match_stats.deaths}
              </span>
            </div>
            {this.props.player.state.round_kills !== 0 && (
              <div
                class={
                  "playerAliveRoundKillsContainer playerAliveRoundKillsContainer" +
                  this.props.side
                }
              >
                <img
                  class="playerAliveRoundKillsImage"
                  src="./svgs/icon_skull_default.svg"
                ></img>
                x
                <span class="playerAliveRoundKills">
                  {this.props.player.state.round_kills}
                </span>
              </div>
            )}
          </div>
          <div class="playerAliveHealthBarContainer">
            <div
              class={
                this.props.team +
                "Outline playerAliveHealthBar playerAliveHealthBar" +
                this.props.side
              }
            ></div>
          </div>
          <div class="playerAliveBottomContainer">
            <div class="playerAliveEco">{this.props.player.state.money}</div>
            <div class="playerAliveUtilContainer"></div>
            <div class="playerAliveEquipmentContainer"></div>
            <div class="playerAliveWeaponContainer"></div>
          </div>
        </div>
      </div>
    );
  }
}
