import React from "react";
import "./spectatedPlayer.css";

export default class SpectatedPlayer extends React.Component {
  constructor(props) {
    //props: player, teams, sides, bomb
    super(props);
    this.state = {
      team: "ct",
      teamInfo: {},
      bomb: false,
      rifle: false,
    };
  }

  componentDidUpdate(prevProps) {
    //calc team (name and ct/t)
    if (this.props.player !== prevProps.player) {
      if (this.props.player.team === "CT") {
        this.setState({
          team: "ct",
        });
      } else {
        this.setState({
          team: "t",
        });
      }
      if (this.state.team === "ct" && this.props.sides.left === "ct") {
        this.setState({
          teamInfo: this.props.teams.left,
        });
      } else if (this.state.team === "ct" && this.props.sides.left !== "ct") {
        this.setState({
          teamInfo: this.props.teams.right,
        });
      }
      if (this.state.team === "t" && this.props.sides.left === "t") {
        this.setState({
          teamInfo: this.props.teams.left,
        });
      } else if (this.state.team === "t" && this.props.sides.left !== "t") {
        this.setState({
          teamInfo: this.props.teams.right,
        });
      }
    }
  }

  render() {
    return (
      <div class="spectatedPlayerContainer">
        <div class="spectatedPlayerInfoContainer">
          <div class="spectatedPlayerInfoContainerLeft">
            <div class="spectatedPlayerName">{this.props.player.name}</div>
            <div class="spectatedPlayerInfoBottom">
              <div class="spectatedPlayerHealthContainer">
                <img
                  class={
                    "spectatedPlayerHealthImage " + this.state.team + "Image"
                  }
                  alt=""
                  src="./svgs/icon_health_full_default.svg"
                ></img>
                <span class={"spectatedPlayerHealth " + this.state.team}>
                  {this.props.player.state.health}
                </span>
              </div>
              <div class="spectatedPlayerArmourContainer">
                <img
                  class={
                    "spectatedPlayerArmourImage " + this.state.team + "Image"
                  }
                  alt=""
                  src={
                    this.props.player.state.helmet === true
                      ? "./svgs/icon_armour_helmet_default.svg"
                      : "./svgs/icon_armour_full_default.svg"
                  }
                ></img>
                <span class={"spectatedPlayerArmour " + this.state.team}>
                  {this.props.player.state.armor}
                </span>
              </div>
              <div class="spectatedPlayerStatsContainer">
                <span class="gray">K</span>
                <span class={this.state.team}>
                  {this.props.player.match_stats.kills}
                </span>{" "}
                <span class="gray">A</span>
                <span class={this.state.team}>
                  {this.props.player.match_stats.assists}
                </span>{" "}
                <span class="gray">D</span>
                <span class={this.state.team}>
                  {this.props.player.match_stats.deaths}
                </span>
              </div>
              <div class="spectatedPlayerRoundKillsContainer">
                <img
                  class={
                    "spectatedPlayerRoundKillsImage " +
                    this.state.team +
                    "Image"
                  }
                  alt=""
                  src="./svgs/icon_skull_default.svg"
                ></img>
                <span class="spectatedPlayerRoundKills">
                  {this.props.player.state.round_kills}
                </span>
              </div>
            </div>
          </div>
          <img
            class="spectatedPlayerTeamLogo"
            alt=""
            src={"./teamImages/" + this.state.teamInfo.img}
          ></img>
        </div>
        <div class="spectatedPlayerHealthBarContainer">
          <div
            class="spectatedPlayerHealthBar"
            style={
              this.state.team === "ct"
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
            }
          ></div>
        </div>
        <div class="spectatedPlayerEquipmentContainer">
          <div class="spectatedPlayerAmmoContainer">
            {Object.keys(this.props.player.weapons).map((key) => {
              if (
                this.props.player.weapons[key].state === "active" &&
                this.props.player.weapons[key].ammo_clip >= 0
              ) {
                return [
                  <img
                    class={
                      "spectatedPlayerAmmoImage " + this.state.team + "Image"
                    }
                    alt=""
                    src="./svgs/icon_bullets_default.svg"
                  ></img>,
                  <span class="spectatedPlayerAmmo">
                    {this.props.player.weapons[key].ammo_clip}/
                    {this.props.player.weapons[key].ammo_clip_max}
                  </span>,
                ];
              }
            })}
          </div>
          <div class="spectatedPlayerEquipment">
            {this.state.team === "ct" &&
              this.props.player.state.defusekit === true && (
                <img
                  class={
                    "spectatedPlayerEquipmentImage " + this.state.team + "Image"
                  }
                  alt=""
                  src="./svgs/icon_defuse_default.svg"
                ></img>
              )}
            {this.state.team === "t" &&
              this.props.bomb.player === this.props.player.steamid && (
                <img
                  class={
                    "spectatedPlayerEquipmentImage " + this.state.team + "Image"
                  }
                  alt=""
                  src="./svgs/icon_bomb_default.svg"
                ></img>
              )}
          </div>
          <div class="spectatedPlayerUtilContainer">
            {Object.keys(this.props.player.weapons).map((key, index) => {
              if (this.props.player.weapons[key].type === "Grenade") {
                if (this.props.player.weapons[key].ammo_reserve === 2) {
                  let temp = [
                    <img
                      key={key + index}
                      class="spectatedPlayerUtilImage"
                      src={
                        "./weapons/" +
                        this.props.player.weapons[key].name +
                        ".svg"
                      }
                      alt=""
                    ></img>,
                    <img
                      key={key + index + 1}
                      class="spectatedPlayerUtilImage"
                      src={
                        "./weapons/" +
                        this.props.player.weapons[key].name +
                        ".svg"
                      }
                      alt=""
                    ></img>,
                  ];
                  return temp;
                } else {
                  return (
                    <img
                      key={key + index}
                      class={
                        this.props.player.weapons[key].state === "active"
                          ? "spectatedPlayerUtilImage active"
                          : "spectatedPlayerUtilImage"
                      }
                      src={
                        "./weapons/" +
                        this.props.player.weapons[key].name +
                        ".svg"
                      }
                      alt=""
                    ></img>
                  );
                }
              }
            })}
          </div>
          <div class="spectatedPlayerWeaponContainer">
            {Object.keys(this.props.player.weapons).map((key) => {
              if (this.props.player.weapons[key].type === "Pistol") {
                return (
                  <img
                    key={key}
                    class={
                      this.props.player.weapons[key].state === "active"
                        ? "spectatedPlayerWeaponSecondary spectatedPlayerWeaponSecondary" +
                          this.props.side +
                          " active"
                        : "spectatedPlayerWeaponSecondary spectatedPlayerWeaponSecondary" +
                          this.props.side
                    }
                    src={
                      "./weapons/" +
                      this.props.player.weapons[key].name +
                      ".svg"
                    }
                    alt=""
                  ></img>
                );
              }
            })}
            {Object.keys(this.props.player.weapons).map((key) => {
              if (
                this.props.player.weapons[key].type === "Rifle" ||
                this.props.player.weapons[key].type === "SniperRifle" ||
                this.props.player.weapons[key].type === "Submachine Gun" ||
                this.props.player.weapons[key].type === "Shotgun"
              ) {
                return (
                  <img
                    key={key}
                    class={
                      this.props.player.weapons[key].state === "active"
                        ? "spectatedPlayerWeaponPrimary spectatedPlayerWeaponPrimary" +
                          this.props.side +
                          " active"
                        : "spectatedPlayerWeaponPrimary spectatedPlayerWeaponPrimary" +
                          this.props.side
                    }
                    src={
                      "./weapons/" +
                      this.props.player.weapons[key].name +
                      ".svg"
                    }
                    alt=""
                  ></img>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}
