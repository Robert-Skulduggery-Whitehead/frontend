import React from "react";
import "./utilBar.css";

export default class UtilBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      utilLevel: "Low",
      fire: 0,
      smoke: 0,
      flash: 0,
      he: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.allplayers !== prevProps.allplayers) {
      let total = 0;
      let tempFire = 0;
      let tempSmoke = 0;
      let tempFlash = 0;
      let tempHE = 0;
      let tempLevel = "none";
      for (let playerID of Object.keys(this.props.allplayers)) {
        for (let weapon of Object.keys(
          this.props.allplayers[playerID].weapons
        )) {
          if (
            this.props.allplayers[playerID].weapons[weapon].name ===
              "weapon_incgrenade" ||
            this.props.allplayers[playerID].weapons[weapon].name ===
              "weapon_molotov"
          ) {
            total++;
            tempFire++;
          }
          if (
            this.props.allplayers[playerID].weapons[weapon].name ===
            "weapon_smokegrenade"
          ) {
            total++;
            tempSmoke++;
          }
          if (
            this.props.allplayers[playerID].weapons[weapon].name ===
            "weapon_hegrenade"
          ) {
            total++;
            tempHE++;
          }
          if (
            this.props.allplayers[playerID].weapons[weapon].name ===
            "weapon_flashbang"
          ) {
            total +=
              this.props.allplayers[playerID].weapons[weapon].ammo_reserve;
            tempFlash +=
              this.props.allplayers[playerID].weapons[weapon].ammo_reserve;
          }
        }
      }
      if (total === 0) {
        tempLevel = "None";
      } else if (total < 10) {
        tempLevel = "Low";
      } else {
        tempLevel = "High";
      }
      this.setState({
        fire: tempFire,
        smoke: tempSmoke,
        flash: tempFlash,
        he: tempHE,
        utilLevel: tempLevel,
      });
    }
  }

  render() {
    if (this.props.round.phase === "freezetime") {
      return (
        <div
          class={
            "utilBarContainer utilBarContainer" +
            this.props.side +
            " " +
            this.props.team
          }
        >
          <div class="utilBarUtilLevelContainer">
            <div class="utilBarUtilLevel">{this.state.utilLevel}</div>
            <div class="utilBarUtilLevelText">Utility</div>
          </div>
          <div
            class={
              "utilBarUtilContainer utilBarUtilContainer" + this.props.side
            }
          >
            <div
              class={"utilBarUtil utilBarFire utilBarUtil" + this.props.side}
            >
              <img
                class="utilBarUtilImage"
                src={
                  this.props.team === "ct"
                    ? "./weapons/weapon_incgrenade.svg"
                    : "./weapons/weapon_molotov.svg"
                }
                alt=""
              ></img>
              <span class="utilBarX">X</span>
              <span class="utilBarUtilAmount">{this.state.fire}</span>
            </div>
            <div
              class={"utilBarUtil utilBarSmoke utilBarUtil" + this.props.side}
            >
              <img
                class="utilBarUtilImage"
                src="./weapons/weapon_smokegrenade.svg"
                alt=""
              ></img>
              <span class="utilBarX">X</span>
              <span class="utilBarUtilAmount">{this.state.smoke}</span>
            </div>
            <div
              class={"utilBarUtil utilBarFlash utilBarUtil" + this.props.side}
            >
              <img
                class="utilBarUtilImage"
                src="./weapons/weapon_flashbang.svg"
                alt=""
              ></img>
              <span class="utilBarX">X</span>
              <span class="utilBarUtilAmount">{this.state.flash}</span>
            </div>
            <div class={"utilBarUtil utilBarHE utilBarUtil" + this.props.side}>
              <img
                class="utilBarUtilImage"
                src="./weapons/weapon_hegrenade.svg"
                alt=""
              ></img>
              <span class="utilBarX">X</span>
              <span class="utilBarUtilAmount">{this.state.he}</span>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
