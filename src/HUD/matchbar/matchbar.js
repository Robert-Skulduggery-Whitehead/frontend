import React from "react";
import "./matchbar.css";
import Timer from "easytimer.js";

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
      phaseCountdown: "",
      render: false,
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
    //Equipment values for teams
    let leftE, rightE;
    for (let key of Object.keys(this.state.allplayers)) {
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
    }
  }

  render() {
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
                (this.state.sides.left === "ct"
                  ? "ctBackground"
                  : "tBackground")
              }
            >
              {this.state.sides.left === "ct" &&
                this.state.bomb.state === "defusing" && (
                  <div>
                    {this.state.allplayers[this.state.bombPlayerID].name} is
                    defusing
                  </div>
                )}
              {this.state.sides.left === "t" &&
                this.state.bomb.state === "planting" && (
                  <div>
                    {this.state.allplayers[this.state.bombPlayerID].name} is
                    planting
                  </div>
                )}
              {this.state.round.phase === "over" &&
                this.state.sides.left.toUpperCase() ===
                  this.state.round.win_team && <div>WINS THE ROUND</div>}
              {this.state.round.phase === "over" &&
                this.state.sides.left.toUpperCase() !==
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
                "teamScore " + (this.state.sides.left === "ct" ? "ct" : "t")
              }
            >
              {this.state.sides.left === "ct"
                ? this.state.map.team_ct.score
                : this.state.map.team_t.score}
            </div>
            <div
              class={
                "teamSeries " +
                (this.state.sides.left === "ct"
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
                (this.state.sides.right === "ct"
                  ? "ctBackground"
                  : "tBackground")
              }
            >
              <span class="dot dotWin"></span>
              <span class="dot"></span>
            </div>
            <div
              class={
                "teamScore " + (this.state.sides.right === "ct" ? "ct" : "t")
              }
            >
              {this.state.sides.right === "ct"
                ? this.state.map.team_ct.score
                : this.state.map.team_t.score}
            </div>
            <div
              class={
                "teamName " +
                (this.state.sides.right === "ct"
                  ? "ctBackground"
                  : "tBackground")
              }
            >
              {this.state.sides.right === "ct" &&
                this.state.bomb.state === "defusing" && (
                  <div class="bombClass">
                    {this.state.allplayers[this.state.bombPlayerID].name} is
                    defusing
                  </div>
                )}
              {this.state.sides.right === "t" &&
                this.state.bomb.state === "planting" && (
                  <div class="bombClass">
                    {this.state.allplayers[this.state.bombPlayerID].name} is
                    planting
                  </div>
                )}
              {this.state.round.phase === "over" &&
                this.state.sides.right.toUpperCase() ===
                  this.state.round.win_team && <div>WINS THE ROUND</div>}
              {this.state.round.phase === "over" &&
                this.state.sides.right.toUpperCase() !==
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
                <span>${this.state.leftEquipValue}</span>
                <img
                  alt=""
                  class="equipmentImage tImage"
                  src="/assets/images/icon_bullets_default.svg"
                ></img>
              </div>
              <div class="lossBonusInfo left">
                <span>${this.state.leftLossBonus}</span>
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
                <span>${this.state.rightEquipValue}</span>
              </div>
              <div class="lossBonusInfo right">
                <img
                  alt=""
                  class="equipmentImage ctImage"
                  src="/assets/images/shopping-cart.svg"
                ></img>
                <span>${this.state.rightLossBonus}</span>
              </div>
            </div>
          </div>
        )}
        {this.state.bomb.state === "planting" && (
          <div class="bombBar">
            <span
              class={
                this.state.sides.left === "t"
                  ? "bombTimer"
                  : "defuseTimer hidden"
              }
              style={
                this.state.sides.left === "t"
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
                this.state.sides.left === "t"
                  ? "/assets/images/icon_c4_default.svg"
                  : "/assets/images/icon_defuse_default.svg"
              }
              class={
                this.state.sides.left === "t" ? "bombImage" : "defuserImage"
              }
            ></img>
            <img
              alt=""
              src={
                this.state.sides.right === "t"
                  ? "/assets/images/icon_c4_default.svg"
                  : "/assets/images/icon_defuse_default.svg"
              }
              class={
                this.state.sides.right === "t" ? "bombImage" : "defuserImage"
              }
            ></img>
            <span
              class={
                this.state.sides.right === "t"
                  ? "bombTimer"
                  : "defuseTimer hidden"
              }
              style={
                this.state.sides.right === "t"
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
                this.state.sides.left === "t"
                  ? "bombTimer"
                  : "defuseTimer hidden"
              }
              style={
                this.state.sides.left === "t"
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
                this.state.sides.left === "t"
                  ? "/assets/images/icon_c4_default.svg"
                  : "/assets/images/icon_defuse_default.svg"
              }
              class={
                this.state.sides.left === "t" ? "bombImage" : "defuserImage"
              }
            ></img>
            <img
              alt=""
              src={
                this.state.sides.right === "t"
                  ? "/assets/images/icon_c4_default.svg"
                  : "/assets/images/icon_defuse_default.svg"
              }
              class={
                this.state.sides.right === "t" ? "bombImage" : "defuserImage"
              }
            ></img>
            <span
              class={
                this.state.sides.right === "t"
                  ? "bombTimer"
                  : "defuseTimer hidden"
              }
              style={
                this.state.sides.right === "t"
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
                this.state.sides.left === "t"
                  ? "bombTimer"
                  : "defuseTimer hidden"
              }
              style={
                this.state.sides.left === "t"
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
                this.state.sides.left === "t"
                  ? "/assets/images/icon_c4_default.svg"
                  : "/assets/images/icon_defuse_default.svg"
              }
              class={
                this.state.sides.left === "t" ? "bombImage" : "defuserImage"
              }
            ></img>
            <img
              alt=""
              src={
                this.state.sides.right === "t"
                  ? "/assets/images/icon_c4_default.svg"
                  : "/assets/images/icon_defuse_default.svg"
              }
              class={
                this.state.sides.right === "t" ? "bombImage" : "defuserImage"
              }
            ></img>
            <span
              class={
                this.state.sides.right === "t"
                  ? "bombTimer"
                  : "defuseTimer hidden"
              }
              style={
                this.state.sides.right === "t"
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
  }
}
