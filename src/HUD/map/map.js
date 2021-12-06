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
        height: -450,
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
            height: -450,
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
