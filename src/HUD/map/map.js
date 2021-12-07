import React from "react";
import "./map.css";
import playerImage from "./player.png";

export default class Map extends React.Component {
  constructor(props) {
    //props: allplayers, map, bomb, player, grenades
    super(props);
    this.state = {
      map: "./maps/de_nuke.png",
      config: {
        height: -490,
        pxPerUX: 0.14376095926926907,
        pxPerUY: -0.14736670935219626,
        layer1: {
          x: 50,
          y: 355,
        },
        layer2: {
          x: 50,
          y: -105,
        },
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.map !== this.props.map) {
      this.setState({
        map: "./maps/" + this.props.map.name + ".png",
      });

      if (this.props.map.name === "de_nuke") {
        this.setState({
          config: {
            height: -490,
            pxPerUX: 0.14376095926926907,
            pxPerUY: -0.14736670935219626,
            layer1: {
              x: 50,
              y: 355,
            },
            layer2: {
              x: 50,
              y: -105,
            },
          },
        });
      } else if (this.props.map.name === "de_ancient") {
        this.setState({
          config: {
            height: -1000,
            pxPerUX: 0.1983512056034216,
            pxPerUY: -0.20108163914549304,
            layer1: {
              x: -65,
              y: 80,
            },
          },
        });
      } else if (this.props.map.name === "de_dust2") {
        this.setState({
          config: {
            height: -1000,
            pxPerUX: 0.2278315639654376,
            pxPerUY: -0.22776482548619972,
            layer1: {
              x: -35,
              y: -220,
            },
          },
        });
      } else if (this.props.map.name === "de_inferno") {
        this.setState({
          config: {
            height: -1000,
            pxPerUX: 0.2041685571162696,
            pxPerUY: -0.20465735943851654,
            layer1: {
              x: 100,
              y: -270,
            },
          },
        });
      } else if (this.props.map.name === "de_mirage") {
        this.setState({
          config: {
            height: -1000,
            pxPerUX: 0.20118507589946494,
            pxPerUY: -0.20138282875746794,
            layer1: {
              x: -125,
              y: 185,
            },
          },
        });
      } else if (this.props.map.name === "de_overpass") {
        this.setState({
          config: {
            height: -1000,
            pxPerUX: 0.1923720959212443,
            pxPerUY: -0.19427507725530338,
            layer1: {
              x: -410,
              y: 180,
            },
          },
        });
      } else if (this.props.map.name === "de_vertigo") {
        this.setState({
          config: {
            height: 11700,
            pxPerUX: 0.1989615567841087,
            pxPerUY: -0.19820052722907044,
            layer1: {
              x: -240,
              y: 270,
            },
            layer2: {
              x: -250,
              y: -150,
            },
          },
        });
      }
    }
  }

  render() {
    return (
      <div
        class="mapContainer"
        style={{ backgroundImage: `url(${this.state.map})` }}
      >
        {Object.keys(this.props.allplayers).map((playerID) => {
          let forwardV1 = this.props.allplayers[playerID].forward.split(",")[0];
          let forwardV2 = this.props.allplayers[playerID].forward.split(",")[1];
          let direction = 0;

          const [axisA, axisB] = [
            Math.asin(forwardV1),
            Math.acos(forwardV2),
          ].map((axis) => (axis * 180) / Math.PI);

          if (axisB < 45) {
            direction = Math.abs(axisA);
          } else if (axisB > 135) {
            direction = 180 - Math.abs(axisA);
          } else {
            direction = axisB;
          }

          if (axisA < 0) {
            direction = -(direction -= 360);
          }

          const previous = direction;

          let modifier = previous;
          modifier -= 360 * Math.floor(previous / 360);
          modifier = -(modifier -= direction);

          if (Math.abs(modifier) > 180) {
            modifier -= (360 * Math.abs(modifier)) / modifier;
          }

          direction += modifier;
          if (
            this.props.allplayers[playerID].position.split(",")[2] >
            this.state.config.height
          ) {
            return (
              <div
                class={
                  "mapPlayer " +
                  (playerID === this.props.player.steamid
                    ? "mapPlayerActive"
                    : "")
                }
                style={{
                  transform: `translateX(${
                    Math.round(
                      this.props.allplayers[playerID].position.split(",")[0] *
                        this.state.config.pxPerUX -
                        this.state.config.layer1.x
                    ) / 2.5
                  }px) translateY(${
                    Math.round(
                      this.props.allplayers[playerID].position.split(",")[1] *
                        this.state.config.pxPerUY -
                        this.state.config.layer1.y
                    ) / 2.5
                  }px)`,
                }}
              >
                <img
                  class={
                    "mapPlayerImage " +
                    (playerID === this.props.bomb.player
                      ? "bombPlayerImage"
                      : this.props.allplayers[playerID].team === "CT"
                      ? "ctImage"
                      : "tImage")
                  }
                  alt=""
                  src={playerImage}
                  style={{
                    transform: `rotate(${45 + direction}deg)`,
                  }}
                ></img>
                <div class="mapPlayerNumber">
                  {this.props.allplayers[playerID].observer_slot}
                </div>
              </div>
            );
          } else {
            return (
              <div
                class={
                  "mapPlayer " +
                  (playerID === this.props.player.steamid
                    ? "mapPlayerActive"
                    : "")
                }
                style={{
                  transform: `translateX(${
                    Math.round(
                      this.props.allplayers[playerID].position.split(",")[0] *
                        this.state.config.pxPerUX -
                        this.state.config.layer2.x
                    ) / 2.5
                  }px) translateY(${
                    Math.round(
                      this.props.allplayers[playerID].position.split(",")[1] *
                        this.state.config.pxPerUY -
                        this.state.config.layer2.y
                    ) / 2.5
                  }px) `,
                }}
              >
                <img
                  class={
                    "mapPlayerImage " +
                    (playerID === this.props.bomb.player
                      ? "bombPlayerImage"
                      : this.props.allplayers[playerID].team === "CT"
                      ? "ctImage"
                      : "tImage")
                  }
                  alt=""
                  src={playerImage}
                ></img>
                <div class="mapPlayerNumber">
                  {this.props.allplayers[playerID].observer_slot}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
