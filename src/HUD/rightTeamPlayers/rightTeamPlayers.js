import React from "react";
import "./rightTeamPlayers.css";

let socket = require("socket.io-client")("http://127.0.0.1:3001");

export default class RightTeamPlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      allplayers: {},
      currentPlayer: {},
      map: {},
      bomb: {},
      teams: {},
      rifle: false,
      pistol: false,
      players: [],
      side: "ct",
      background: "ctBackground",
    };
  }

  componentDidCatch(error, errorInfo) {
    //
  }

  componentDidMount() {
    socket.on("menu", (menu) => {
      this.setState({
        render: false,
      });
    });

    socket.emit("getrender");

    socket.on("render", (render) => {
      if (render) {
        this.setState({
          render: true,
        });
      }
    });

    socket.on("allplayers", (allPlayers) => {
      this.setState({
        allplayers: allPlayers,
      });
      for (const key of Object.keys(this.state.allplayers)) {
        if (this.state.allplayers[key].observer_slot == 1) {
          let tempSide = this.state.allplayers[key].team.toLowerCase();
          if (tempSide == "ct") {
            this.state.side = "t";
          } else {
            this.state.side = "ct";
          }
          if (this.state.side == "ct") {
            this.state.background = "ctBackground";
          } else {
            this.state.background = "tBackground";
          }
        }
      }
      this.state.players = [];
      for (const key of Object.keys(this.state.allplayers)) {
        if (this.state.allplayers[key].team.toLowerCase() === this.state.side) {
          if (!this.state.players.includes(key)) {
            this.state.players.push(key);
          }
        }
      }
    });

    socket.on("player", (currentPlayer) => {
      this.setState({
        currentplayer: currentPlayer,
      });
    });

    socket.on("map", (map) => {
      this.setState({
        map: map,
      });
    });

    socket.on("bomb", (bomb) => {
      this.setState({
        bomb: bomb,
      });
    });
  }

  render() {
    if (this.state.players.length != Object.keys(this.state.allplayers)) {
      return (
        <div class="rplayersContainer">
          {this.state.players.map((playerID) => (
            <div>
              {this.state.allplayers[playerID].state.health > 0 && (
                <div class="rplayerAlive">
                  <div
                    class={"rplayerATop"}
                    style={
                      this.state.side == "ct"
                        ? {
                            background:
                              "linear-gradient(90deg, #1d2b41 " +
                              (100 -
                                this.state.allplayers[playerID].state.health) +
                              "%, #0a88c5 " +
                              0 +
                              "%",
                          }
                        : {
                            background:
                              "linear-gradient(90deg, #1d2b41 " +
                              (100 -
                                this.state.allplayers[playerID].state.health) +
                              "%, #ff6e00 " +
                              0 +
                              "%",
                          }
                    }
                  >
                    {(this.state.rifle = false)}
                    {(this.state.pistol = false)}
                    {Object.keys(this.state.allplayers[playerID].weapons).map(
                      (key) => {
                        if (
                          this.state.allplayers[playerID].weapons[key].type ===
                            "Rifle" ||
                          this.state.allplayers[playerID].weapons[key].type ===
                            "SniperRifle" ||
                          this.state.allplayers[playerID].weapons[key].type ===
                            "Submachine Gun" ||
                          this.state.allplayers[playerID].weapons[key].type ===
                            "Shotgun"
                        ) {
                          this.state.rifle = true;
                          return (
                            <img
                              class={
                                this.state.allplayers[playerID].weapons[key]
                                  .state == "active"
                                  ? "rweaponPrimary active"
                                  : "rweaponPrimary"
                              }
                              src={
                                "/assets/weapons/" +
                                this.state.allplayers[playerID].weapons[key]
                                  .name +
                                ".svg"
                              }
                            ></img>
                          );
                        }
                      }
                    )}
                    {Object.keys(this.state.allplayers[playerID].weapons).map(
                      (key) => {
                        if (
                          this.state.rifle == false &&
                          this.state.allplayers[playerID].weapons[key].type ===
                            "Pistol"
                        ) {
                          this.state.pistol = true;
                          return (
                            <img
                              class={
                                this.state.allplayers[playerID].weapons[key]
                                  .state == "active"
                                  ? "rweaponPrimary active"
                                  : "rweaponPrimary"
                              }
                              src={
                                "/assets/weapons/" +
                                this.state.allplayers[playerID].weapons[key]
                                  .name +
                                ".svg"
                              }
                            ></img>
                          );
                        }
                      }
                    )}
                    {Object.keys(this.state.allplayers[playerID].weapons).map(
                      (key) => {
                        if (
                          this.state.pistol == false &&
                          this.state.rifle == false &&
                          this.state.allplayers[playerID].weapons[key].type ===
                            "Pistol"
                        ) {
                          this.state.pistol = true;
                          return (
                            <img
                              class={
                                this.state.allplayers[playerID].weapons[key]
                                  .state == "active"
                                  ? "rweaponPrimary active"
                                  : "rweaponPrimary"
                              }
                              src={
                                "/assets/weapons/" +
                                this.state.allplayers[playerID].weapons[key]
                                  .name +
                                ".svg"
                              }
                            ></img>
                          );
                        }
                      }
                    )}
                    <div class="rplayerName">
                      {this.state.allplayers[playerID].name}
                    </div>
                    <div class="rplayerNo">
                      |{this.state.allplayers[playerID].observer_slot}
                    </div>
                    <div class="rplayerHP">
                      {this.state.allplayers[playerID].state.health}
                    </div>
                  </div>
                  <div class="rbar"></div>
                  <div class="rplayerABottom">
                    <div class="rplayerEquipment">
                      {this.state.side === "ct" &&
                        this.state.allplayers[playerID].state.defusekit ==
                          true && (
                          <img
                            class="requipmentImage"
                            src="/assets/images/icon_defuse_default.svg"
                          ></img>
                        )}
                      {this.state.side == "t" &&
                        this.state.bomb.player == playerID && (
                          <img
                            class="equipmentImage"
                            src="/assets/images/icon_c4_default.svg"
                          ></img>
                        )}
                    </div>
                    <div class="playerStats">
                      K
                      <span class={this.state.side}>
                        {this.state.allplayers[playerID].match_stats.kills}
                      </span>{" "}
                      D
                      <span class={this.state.side}>
                        {this.state.allplayers[playerID].match_stats.deaths}
                      </span>{" "}
                      A
                      <span class={this.state.side}>
                        {this.state.allplayers[playerID].match_stats.assists}
                      </span>
                    </div>
                    <div class="rplayerUtil">
                      {Object.keys(this.state.allplayers[playerID].weapons).map(
                        (key) => {
                          if (
                            this.state.allplayers[playerID].weapons[key]
                              .type === "Grenade"
                          ) {
                            return (
                              <img
                                class="rutilImage"
                                src={
                                  "/assets/weapons/" +
                                  this.state.allplayers[playerID].weapons[key]
                                    .name +
                                  ".svg"
                                }
                              ></img>
                            );
                          }
                        }
                      )}
                    </div>
                    <div class="rplayerArmour">
                      {this.state.allplayers[playerID].state.helmet == true &&
                        this.state.allplayers[playerID].state.armor > 0 && (
                          <img
                            class="rarmourImage"
                            src="/assets/images/icon_armor_full_default.svg"
                          ></img>
                        )}
                      {this.state.allplayers[playerID].state.helmet == false &&
                        this.state.allplayers[playerID].state.armor > 0 && (
                          <img
                            class="rarmourImage"
                            src="/assets/images/icon_armor_full_default.svg"
                          ></img>
                        )}
                    </div>
                    <div class="rplayerCash">
                      ${this.state.allplayers[playerID].state.money}
                    </div>
                    <div class={"rplayerSpent " + this.state.side}>
                      <div></div>
                    </div>
                    <div class="rroundKills">
                      {this.state.allplayers[playerID].state.round_kills}
                      <img
                        class={"rkillsImage " + this.state.side}
                        src="/assets/images/bomb.svg"
                      ></img>
                    </div>
                  </div>
                </div>
              )}
              {this.state.allplayers[playerID].state.health == 0 && (
                <div class="rplayerDead"></div>
              )}
            </div>
          ))}
        </div>
      );
    } else {
      return <div>Placeholder</div>;
    }
  }
}
