import React from "react";
import "./matchbar.css";
import Timer from "easytimer.js";

let socket = require("socket.io-client")("http://127.0.0.1:3001");

export default class Matchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      teamLeftEquipValue: 0,
      teamRightEquipValue: 0,
      teamLeftLossBonus: 0,
      teamRightLossBonus: 0,
      phaseCountdown: "",
      allplayers: {},
      render: false,
      map: {},
      bomb: {},
      round: {},
      phase_countdowns: {},
      bombPlayerID: "",
      teamLeft: {
        side: "ct",
        name: "Team 1",
        img: "bravado.png",
      },
      teamRight: {
        side: "t",
        name: "Team 2",
        img: "bravado.png",
      },
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

    socket.on("allplayers", (allPlayers) => {
      this.setState({
        allplayers: allPlayers,
      });
      for (let key of Object.keys(allPlayers)) {
        if (this.state.allplayers[key].observer_slot == 1) {
          this.state.teamLeft.side =
            this.state.allplayers[key].team.toLowerCase();
        }
        if (this.state.allplayers[key].observer_slot == 6) {
          this.state.teamRight.side =
            this.state.allplayers[key].team.toLowerCase();
        }
      }
      let leftE = 0;
      let rightE = 0;
      let keys = Object.keys(this.state.allplayers);
      for (let key of keys) {
        if (
          this.state.allplayers[key].team ===
          this.state.teamLeft.side.toUpperCase()
        ) {
          leftE = leftE + this.state.allplayers[key].state.equip_value;
        } else {
          rightE = rightE + this.state.allplayers[key].state.equip_value;
        }
      }
      this.setState({
        teamLeftEquipValue: leftE,
        teamRightEquipValue: rightE,
      });
    });

    socket.on("player", (currentPlayer) => {
      this.setState({
        currentplayer: currentPlayer,
      });
    });

    socket.on("map", (map) => {
      this.setState({
        map: map,
        render: true,
      });
      if (this.state.teamLeft.side == "ct") {
        if (this.state.map.team_ct.consecutive_round_losses == 1) {
          this.state.teamLeftLossBonus = "1900";
        } else if (this.state.map.team_ct.consecutive_round_losses == 2) {
          this.state.teamLeftLossBonus = "2400";
        } else if (this.state.map.team_ct.consecutive_round_losses == 3) {
          this.state.teamLeftLossBonus = "2900";
        } else if (this.state.map.team_ct.consecutive_round_losses >= 4) {
          this.state.teamLeftLossBonus = "3400";
        }

        if (this.state.map.team_t.consecutive_round_losses == 1) {
          this.state.teamRightLossBonus = "1900";
        } else if (this.state.map.team_t.consecutive_round_losses == 2) {
          this.state.teamRightLossBonus = "2400";
        } else if (this.state.map.team_t.consecutive_round_losses == 3) {
          this.state.teamRightLossBonus = "2900";
        } else if (this.state.map.team_t.consecutive_round_losses >= 4) {
          this.state.teamRightLossBonus = "3400";
        }
      } else {
        if (this.state.map.team_ct.consecutive_round_losses == 1) {
          this.state.teamRightLossBonus = "1900";
        } else if (this.state.map.team_ct.consecutive_round_losses == 2) {
          this.state.teamRightLossBonus = "2400";
        } else if (this.state.map.team_ct.consecutive_round_losses == 3) {
          this.state.teamRightLossBonus = "2900";
        } else if (this.state.map.team_ct.consecutive_round_losses >= 4) {
          this.state.teamRightLossBonus = "3400";
        }

        if (this.state.map.team_t.consecutive_round_losses == 1) {
          this.state.teamLeftLossBonus = "1900";
        } else if (this.state.map.team_t.consecutive_round_losses == 2) {
          this.state.teamLeftLossBonus = "2400";
        } else if (this.state.map.team_t.consecutive_round_losses == 3) {
          this.state.teamLeftLossBonus = "2900";
        } else if (this.state.map.team_t.consecutive_round_losses >= 4) {
          this.state.teamLeftLossBonus = "3400";
        }
      }
    });

    socket.on("bomb", (bomb) => {
      if (bomb.player != undefined) {
        this.setState({
          bombPlayerID: bomb.player,
        });
      }
      this.setState({
        bomb: bomb,
      });

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
    });

    socket.on("round", (round) => {
      this.setState({
        round: round,
      });
      if (this.state.round.phase == "over") {
        this.setState({
          bombPlanted: false,
          bombDefused: false,
        });
      }
    });

    socket.on("phase_countdowns", (phase_countdowns) => {
      this.setState({
        phase_countdowns: phase_countdowns,
      });

      let min = 0;
      let seconds = 0;
      let time = this.state.phase_countdowns.phase_ends_in;

      while (time > 60) {
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
      }
    });
  }

  render() {
    if (this.state.render) {
      console.log(this.state.plantedPercentage);
      return (
        <div>
          <div class="infoBar">
            <div class="tournamentInfo">IEM FALL | DAY 5</div>
            <img alt="" class="logo" src="/assets/teamlogos/bravado.png"></img>
            <div class="seriesInfo">3RD PLACE DECIDER | Best of 3</div>
          </div>
          <div class="matchBar">
            <div class="team" id="teamLeft">
              <img
                alt=""
                class="teamLogo"
                src={"/assets/teamlogos/" + this.state.teamLeft.img}
              ></img>
              <div
                class={
                  "teamName " +
                  (this.state.teamLeft.side === "ct"
                    ? "ctBackground"
                    : "tBackground")
                }
              >
                {this.state.teamLeft.side === "ct" &&
                  this.state.bomb.state === "defusing" && (
                    <div>
                      {this.state.allplayers[this.state.bombPlayerID].name} is
                      defusing
                    </div>
                  )}
                {this.state.teamLeft.side === "t" &&
                  this.state.bomb.state === "planting" && (
                    <div>
                      {this.state.allplayers[this.state.bombPlayerID].name} is
                      planting
                    </div>
                  )}
                {this.state.round.phase === "over" &&
                  this.state.teamLeft.side.toUpperCase() ===
                    this.state.round.win_team && <div>WINS THE ROUND</div>}
                {this.state.round.phase === "over" &&
                  this.state.teamLeft.side.toUpperCase() !==
                    this.state.round.win_team && (
                    <div>{this.state.teamLeft.name}</div>
                  )}
                {this.state.bomb.state !== "planting" &&
                  this.state.bomb.state !== "defusing" &&
                  this.state.round.phase !== "over" && (
                    <div>{this.state.teamLeft.name}</div>
                  )}
              </div>
              <div
                class={
                  "teamScore " +
                  (this.state.teamLeft.side === "ct" ? "ct" : "t")
                }
              >
                {this.state.teamLeft.side === "ct"
                  ? this.state.map.team_ct.score
                  : this.state.map.team_t.score}
              </div>
              <div
                class={
                  "teamSeries " +
                  (this.state.teamLeft.side === "ct"
                    ? "ctBackground"
                    : "tBackground")
                }
              >
                <span class="dot dotWin"></span>
                <span class="dot"></span>
              </div>
            </div>
            {this.state.bomb.state === "planted" && (
              <div class="roundBomb">
                <img
                  src="/assets/images/icon_c4_default.svg"
                  class="roundBombImage"
                ></img>
              </div>
            )}
            {this.state.bomb.state !== "planted" && (
              <div class="roundInfo">
                <div class="roundNo">Round {this.state.map.round + 1}</div>
                <div class="roundTimer">{this.state.phaseCountdown}</div>
              </div>
            )}
            <div class="team" id="teamRight">
              <div
                class={
                  "teamSeries " +
                  (this.state.teamRight.side === "ct"
                    ? "ctBackground"
                    : "tBackground")
                }
              >
                <span class="dot dotWin"></span>
                <span class="dot"></span>
              </div>
              <div
                class={
                  "teamScore " +
                  (this.state.teamRight.side === "ct" ? "ct" : "t")
                }
              >
                {this.state.teamRight.side === "ct"
                  ? this.state.map.team_ct.score
                  : this.state.map.team_t.score}
              </div>
              <div
                class={
                  "teamName " +
                  (this.state.teamRight.side === "ct"
                    ? "ctBackground"
                    : "tBackground")
                }
              >
                {this.state.teamRight.side === "ct" &&
                  this.state.bomb.state === "defusing" && (
                    <div class="bombClass">
                      {this.state.allplayers[this.state.bombPlayerID].name} is
                      defusing
                    </div>
                  )}
                {this.state.teamRight.side === "t" &&
                  this.state.bomb.state === "planting" && (
                    <div class="bombClass">
                      {this.state.allplayers[this.state.bombPlayerID].name} is
                      planting
                    </div>
                  )}
                {this.state.round.phase === "over" &&
                  this.state.teamRight.side.toUpperCase() ===
                    this.state.round.win_team && <div>WINS THE ROUND</div>}
                {this.state.round.phase === "over" &&
                  this.state.teamRight.side.toUpperCase() !==
                    this.state.round.win_team && (
                    <div>{this.state.teamRight.name}</div>
                  )}
                {this.state.bomb.state !== "planting" &&
                  this.state.bomb.state !== "defusing" &&
                  this.state.round.phase !== "over" && (
                    <div>{this.state.teamRight.name}</div>
                  )}
              </div>
              <img
                alt=""
                class="teamLogo"
                src={"/assets/teamlogos/" + this.state.teamLeft.img}
              ></img>
            </div>
          </div>
          {this.state.round.phase === "freezetime" && (
            <div class="teamInfoBar">
              <div class="info">
                <div class="equipmentInfo left">
                  <span>${this.state.teamLeftEquipValue}</span>
                  <img
                    alt=""
                    class="equipmentImage tImage"
                    src="/assets/images/icon_bullets_default.svg"
                  ></img>
                </div>
                <div class="lossBonusInfo left">
                  <span>${this.state.teamLeftLossBonus}</span>
                  <img
                    alt=""
                    class="equipmentImage tImage"
                    src="/assets/images/shopping-cart.svg"
                  ></img>
                </div>
              </div>
              <div class="titles">
                <span>Equip. Value</span>
                <span>Loss Bonus</span>
              </div>
              <div class="info">
                <div class="equipmentInfo right">
                  <img
                    alt=""
                    class="equipmentImage ctImage"
                    src="/assets/images/icon_bullets_default.svg"
                  ></img>
                  <span>${this.state.teamRightEquipValue}</span>
                </div>
                <div class="lossBonusInfo right">
                  <img
                    alt=""
                    class="equipmentImage ctImage"
                    src="/assets/images/shopping-cart.svg"
                  ></img>
                  <span>${this.state.teamRightLossBonus}</span>
                </div>
              </div>
            </div>
          )}
          {this.state.bomb.state === "planting" && (
            <div class="bombBar">
              <span
                class={
                  this.state.teamLeft.side === "t"
                    ? "bombTimer"
                    : "defuseTimer hidden"
                }
                style={
                  this.state.teamLeft.side === "t"
                    ? {
                        background:
                          "linear-gradient(90deg, white " +
                          (100 - this.state.plantingPercentage) +
                          "%, rgba(255, 110, 0, 1) " +
                          0 +
                          "%",
                      }
                    : {}
                }
              ></span>
              <img
                alt=""
                src={
                  this.state.teamLeft.side === "t"
                    ? "/assets/images/icon_c4_default.svg"
                    : "/assets/images/icon_defuse_default.svg"
                }
                class={
                  this.state.teamLeft.side === "t"
                    ? "bombImage"
                    : "defuserImage"
                }
              ></img>
              <img
                alt=""
                src={
                  this.state.teamRight.side === "t"
                    ? "/assets/images/icon_c4_default.svg"
                    : "/assets/images/icon_defuse_default.svg"
                }
                class={
                  this.state.teamRight.side === "t"
                    ? "bombImage"
                    : "defuserImage"
                }
              ></img>
              <span
                class={
                  this.state.teamRight.side === "t"
                    ? "bombTimer"
                    : "defuseTimer hidden"
                }
                style={
                  this.state.teamRight.side === "t"
                    ? {
                        background:
                          "linear-gradient(90deg, rgba(255, 110, 0, 1) " +
                          this.state.plantingPercentage +
                          "%, white " +
                          0 +
                          "%",
                      }
                    : {}
                }
              ></span>
            </div>
          )}
          {this.state.bomb.state === "planted" && (
            <div class="bombBar">
              <span
                class={
                  this.state.teamLeft.side === "t"
                    ? "bombTimer"
                    : "defuseTimer hidden"
                }
                style={
                  this.state.teamLeft.side === "t"
                    ? {
                        background:
                          "linear-gradient(90deg, white " +
                          (100 - this.state.plantedPercentage) +
                          "%, rgba(255, 110, 0, 1) " +
                          0 +
                          "%",
                      }
                    : {}
                }
              ></span>
              <img
                alt=""
                src={
                  this.state.teamLeft.side === "t"
                    ? "/assets/images/icon_c4_default.svg"
                    : "/assets/images/icon_defuse_default.svg"
                }
                class={
                  this.state.teamLeft.side === "t"
                    ? "bombImage"
                    : "defuserImage"
                }
              ></img>
              <img
                alt=""
                src={
                  this.state.teamRight.side === "t"
                    ? "/assets/images/icon_c4_default.svg"
                    : "/assets/images/icon_defuse_default.svg"
                }
                class={
                  this.state.teamRight.side === "t"
                    ? "bombImage"
                    : "defuserImage"
                }
              ></img>
              <span
                class={
                  this.state.teamRight.side === "t"
                    ? "bombTimer"
                    : "defuseTimer hidden"
                }
                style={
                  this.state.teamRight.side === "t"
                    ? {
                        background:
                          "linear-gradient(90deg, rgba(255, 110, 0, 1) " +
                          (100 - this.state.plantedPercentage) +
                          "%, white " +
                          0 +
                          "%",
                      }
                    : {}
                }
              ></span>
            </div>
          )}
          {this.state.bomb.state === "defusing" && (
            <div class="bombBar">
              <span
                class={
                  this.state.teamLeft.side === "t"
                    ? "bombTimer"
                    : "defuseTimer hidden"
                }
                style={
                  this.state.teamLeft.side === "t"
                    ? {
                        background:
                          "linear-gradient(90deg, white " +
                          (100 - this.state.plantedPercentage) +
                          "%, rgba(255, 110, 0, 1) " +
                          0 +
                          "%",
                      }
                    : {
                        background:
                          "linear-gradient(90deg, #0a88c5 " +
                          this.state.defusingPercentage +
                          "%, white " +
                          0 +
                          "%",
                      }
                }
              ></span>
              <img
                alt=""
                src={
                  this.state.teamLeft.side === "t"
                    ? "/assets/images/icon_c4_default.svg"
                    : "/assets/images/icon_defuse_default.svg"
                }
                class={
                  this.state.teamLeft.side === "t"
                    ? "bombImage"
                    : "defuserImage"
                }
              ></img>
              <img
                alt=""
                src={
                  this.state.teamRight.side === "t"
                    ? "/assets/images/icon_c4_default.svg"
                    : "/assets/images/icon_defuse_default.svg"
                }
                class={
                  this.state.teamRight.side === "t"
                    ? "bombImage"
                    : "defuserImage"
                }
              ></img>
              <span
                class={
                  this.state.teamRight.side === "t"
                    ? "bombTimer"
                    : "defuseTimer hidden"
                }
                style={
                  this.state.teamRight.side === "t"
                    ? {
                        background:
                          "linear-gradient(90deg, rgba(255, 110, 0, 1) " +
                          this.state.plantedPercentage +
                          "%, white " +
                          0 +
                          "%",
                      }
                    : {
                        background:
                          "linear-gradient(90deg, white " +
                          (100 - this.state.plantedPercentage) +
                          "%, #0a88c5 " +
                          0 +
                          "%",
                      }
                }
              ></span>
            </div>
          )}
        </div>
      );
    } else {
      return <div>Placeholder</div>;
    }
  }
}
