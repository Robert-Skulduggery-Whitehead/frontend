import React from "react";
import "./playerAlive.css";

export default class PlayerAlive extends React.Component {
  constructor(props) {
    //props: team, side, player, teamLogo, bomb, playerID
    super(props);
    this.state = {
      rifle: false,
      pistol: false,
    };
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
              style={
                this.props.side === "Left"
                  ? this.props.team == "ct"
                    ? {
                        background:
                          "linear-gradient(90deg, #0a88c5 " +
                          this.props.player.state.health +
                          "%, #1a1a1a " +
                          0 +
                          "%",
                      }
                    : {
                        background:
                          "linear-gradient(90deg, #ff6e00 " +
                          this.props.player.state.health +
                          "%, #1a1a1a " +
                          0 +
                          "%",
                      }
                  : this.props.team == "ct"
                  ? {
                      background:
                        "linear-gradient(90deg, #1a1a1a " +
                        (100 - this.props.player.state.health) +
                        "%, #0a88c5 " +
                        0 +
                        "%",
                    }
                  : {
                      background:
                        "linear-gradient(90deg, #1a1a1a " +
                        (100 - this.props.player.state.health) +
                        "%, #ff6e00 " +
                        0 +
                        "%",
                    }
              }
            ></div>
          </div>
          <div
            class={
              "playerAliveBottomContainer playerAliveBottomContainer" +
              this.props.side
            }
          >
            <div class={"playerAliveArmourContainer"}>
              {this.props.player.state.armor !== 0 &&
                this.props.player.state.helmet === true && (
                  <img
                    class="playerAliveArmourImage"
                    src="./svgs/icon_armor_helmet_default.svg"
                    alt=""
                  ></img>
                )}
              {this.props.player.state.armor !== 0 &&
                this.props.player.state.helmet === false && (
                  <img
                    class="playerAliveArmourImage"
                    src="./svgs/icon_armor_full_default.svg"
                    alt=""
                  ></img>
                )}
            </div>
            <div class={"playerAliveEco"}>${this.props.player.state.money}</div>
            <div class="playerAliveUtilContainer">
              {Object.keys(this.props.player.weapons).map((key) => {
                if (this.props.player.weapons[key].type === "Grenade") {
                  return (
                    <img
                      class="playerAliveUtilImage"
                      src={
                        "./weapons/" +
                        this.props.player.weapons[key].name +
                        ".svg"
                      }
                    ></img>
                  );
                }
              })}
            </div>
            <div class="playerAliveEquipmentContainer">
              {this.props.team === "ct" &&
                this.props.player.state.defusekit === true && (
                  <img
                    class={
                      "playerAliveEquipmentImage playerAliveEquipmentImage" +
                      this.props.side
                    }
                    src="./svgs/icon_defuse_default.svg"
                    alt=""
                  ></img>
                )}
              {this.props.team === "t" &&
                this.props.playerID === this.props.bomb.player && (
                  <img
                    class={
                      "playerAliveEquipmentImage playerAliveEquipmentImage" +
                      this.props.side
                    }
                    src="./svgs/icon_bomb_default.svg"
                    alt=""
                  ></img>
                )}
            </div>
            <div class="playerAliveWeaponContainer">
              {(this.state.rifle = false)}
              {(this.state.pistol = false)}
              {Object.keys(this.props.player.weapons).map((key) => {
                if (
                  this.props.player.weapons[key].type === "Rifle" ||
                  this.props.player.weapons[key].type === "SniperRifle" ||
                  this.props.player.weapons[key].type === "Submachine Gun" ||
                  this.props.player.weapons[key].type === "Shotgun"
                ) {
                  this.state.rifle = true;
                  return (
                    <img
                      class={
                        this.props.player.weapons[key].state == "active"
                          ? "playerAliveWeaponPrimary playerAliveWeaponPrimary" +
                            this.props.side +
                            " active"
                          : "playerAliveWeaponPrimary playerAliveWeaponPrimary" +
                            this.props.side
                      }
                      src={
                        "./weapons/" +
                        this.props.player.weapons[key].name +
                        ".svg"
                      }
                    ></img>
                  );
                }
              })}
              {Object.keys(this.props.player.weapons).map((key) => {
                if (
                  this.state.rifle == false &&
                  this.props.player.weapons[key].type === "Pistol"
                ) {
                  this.state.pistol = true;
                  return (
                    <img
                      class={
                        this.props.player.weapons[key].state == "active"
                          ? "playerAliveWeaponPrimary playerAliveWeaponPrimary" +
                            this.props.side +
                            " active"
                          : "playerAliveWeaponPrimary playerAliveWeaponPrimary" +
                            this.props.side
                      }
                      src={
                        "./weapons/" +
                        this.props.player.weapons[key].name +
                        ".svg"
                      }
                    ></img>
                  );
                }
              })}
              {Object.keys(this.props.player.weapons).map((key) => {
                if (
                  this.state.pistol == false &&
                  this.state.rifle == false &&
                  this.props.player.weapons[key].type === "Pistol"
                ) {
                  this.state.pistol = true;
                  return (
                    <img
                      class={
                        this.props.player.weapons[key].state == "active"
                          ? "playerAliveWeaponPrimary playerAliveWeaponPrimary" +
                            this.props.side +
                            " active"
                          : "playerAliveWeaponPrimary playerAliveWeaponPrimary" +
                            this.props.side
                      }
                      src={
                        "./weapons/" +
                        this.props.player.weapons[key].name +
                        ".svg"
                      }
                    ></img>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
