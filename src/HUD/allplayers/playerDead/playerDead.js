import React from "react";
import "./playerDead.css";

export default class PlayerDead extends React.Component {
  constructor(props) {
    //props: team, side, player, teamLogo
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <div class={"playerDeadContainer playerDeadContainer" + this.props.side}>
        <div class={"playerDeadImageContainer"}>
          {this.props.player.image === "" && (
            <img
              class="playerDeadImage"
              src={"./teamImages/" + this.props.teamLogo}
            ></img>
          )}
          {this.props.player.image !== "" && (
            <img
              class="playerDeadImage"
              src={"./playerImages/" + this.props.player.image}
            ></img>
          )}
        </div>
        <div class={"playerDeadHealthContainer " + this.props.team + "Shadow"}>
          <div class={"playerDeadHealth"}>
            <img
              class="playerDeadSkullImage"
              src="./svgs/icon_skull_default.svg"
              alt=""
            ></img>
          </div>
        </div>
        <div class={"playerDeadRestContainer"}>
          <div
            class={
              "playerDeadTopContainer playerDeadTopContainer" + this.props.side
            }
          >
            <div class={"playerDeadName playerDeadName" + this.props.side}>
              {this.props.player.name}
            </div>
            <div class={"playerDeadKDA"}>
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
                  "playerDeadRoundKillsContainer playerDeadRoundKillsContainer" +
                  this.props.side
                }
              >
                <img
                  class="playerDeadRoundKillsImage"
                  src="./svgs/icon_skull_default.svg"
                ></img>
                x
                <span class="playerDeadRoundKills">
                  {this.props.player.state.round_kills}
                </span>
              </div>
            )}
          </div>
          <div
            class={
              "playerDeadBottomContainer playerDeadBottomContainer" +
              this.props.side
            }
          >
            <div class={"playerDeadEco playerDeadEco" + this.props.side}>
              ${this.props.player.state.money}
            </div>
            <div
              class={
                "playerDeadRoundDamageContainer playerDeadRoundDamageContainer" +
                this.props.side
              }
            >
              <span class="playerDeadRoundDamageText">DMG</span>
              <span class="playerDeadRoundDamage">
                {this.props.player.state.round_totaldmg}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
