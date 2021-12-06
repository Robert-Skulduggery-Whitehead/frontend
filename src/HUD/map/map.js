import React from "react";
import "./map.css";

export default class Map extends React.Component {
  constructor(props) {
    //props: allplayers, map, bomb, player, grenades
    super(props);
    this.state = {
      map: "./maps/de_nuke.png",
      config: {
        //If player is above height, use layer1, else layer 2
        //Maps with one layer height = some value that cant be reached,d efaulting to layer 1
        height: -450,
        layer1: {
          x: 473.1284773048749,
          y: 165.7329003801045,
        },
        layer2: {
          x: 473.66746071612374,
          y: 638.302101754172,
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
            layer1: {
              x: 473.1284773048749,
              y: 165.7329003801045,
            },
            layer2: {
              x: 473.66746071612374,
              y: 638.302101754172,
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
              <div>
                {this.props.allplayers[playerID].name}
                <div>{this.props.allplayers[playerID].position}</div>
              </div>
            );
          } else {
            return (
              <div>
                {this.props.allplayers[playerID].name}
                <div>{this.props.allplayers[playerID].position}</div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
