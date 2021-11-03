/*import React from "react";
import "./leftTeamPlayers.css";

let socket = require("socket.io-client")("http://127.0.0.1:3001");

export default class LeftTeamPlayers extends React.Component {
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
          this.state.side = this.state.allplayers[key].team.toLowerCase();
          if (this.state.side == "t") {
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
        <div class="playersContainer">
          {this.state.players.map((playerID) => (
            <div>
              {this.state.allplayers[playerID].state.health > 0 && (
                <div class="playerAlive">
                  <div
                    class={"playerATop"}
                    style={
                      this.state.side == "ct"
                        ? {
                            background:
                              "linear-gradient(90deg, #0a88c5 " +
                              this.state.allplayers[playerID].state.health +
                              "%, #1d2b41 " +
                              0 +
                              "%",
                          }
                        : {
                            background:
                              "linear-gradient(90deg, #ff6e00 " +
                              this.state.allplayers[playerID].state.health +
                              "%, #1d2b41 " +
                              0 +
                              "%",
                          }
                    }
                  >
                    <div class="playerHP">
                      {this.state.allplayers[playerID].state.health}
                    </div>
                    <div class="playerNo">
                      {this.state.allplayers[playerID].observer_slot}|
                    </div>
                    <div class="playerName">
                      {this.state.allplayers[playerID].name}
                    </div>
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
                                  ? "weaponPrimary active"
                                  : "weaponPrimary"
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
                                  ? "weaponPrimary active"
                                  : "weaponPrimary"
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
                                  ? "weaponPrimary active"
                                  : "weaponPrimary"
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
                  </div>
                  <div class="bar"></div>
                  <div class="playerABottom">
                    <div class="playerEquipment">
                      {this.state.side === "ct" &&
                        this.state.allplayers[playerID].state.defusekit ==
                          true && (
                          <img
                            class="equipmentImage"
                            src="/assets/images/icon_defuse_default.svg"
                          ></img>
                        )}
                      {this.state.side == "t" &&
                        this.state.bomb.player ==
                          this.state.allplayers[playerID] && (
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
                    <div class="playerUtil">
                      {Object.keys(this.state.allplayers[playerID].weapons).map(
                        (key) => {
                          if (
                            this.state.allplayers[playerID].weapons[key]
                              .type === "Grenade"
                          ) {
                            return (
                              <img
                                class="utilImage"
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
                    <div class="playerArmour">
                      {this.state.allplayers[playerID].state.helmet == true &&
                        this.state.allplayers[playerID].state.armor > 0 && (
                          <img
                            class="armourImage"
                            src="/assets/images/icon_armor_full_default.svg"
                          ></img>
                        )}
                      {this.state.allplayers[playerID].state.helmet == false &&
                        this.state.allplayers[playerID].state.armor > 0 && (
                          <img
                            class="armourImage"
                            src="/assets/images/icon_armor_full_default.svg"
                          ></img>
                        )}
                    </div>
                    <div class="playerCash">
                      ${this.state.allplayers[playerID].state.money}
                    </div>
                    <div class={"playerSpent " + this.state.side}>
                      <div></div>
                    </div>
                    <div class="roundKills">
                      <img
                        class={"killsImage " + this.state.side}
                        src="/assets/images/bomb.svg"
                      ></img>
                      {this.state.allplayers[playerID].state.round_kills}
                    </div>
                  </div>
                </div>
              )}
              {this.state.allplayers[playerID].state.health == 0 && (
                <div class="playerDead"></div>
              )}
            </div>
          ))}
        </div>
      );
    } else {
      return <div>Placeholder</div>;
    }
  }
}*/
