import React from "react";

export default class SeriesInfo extends React.Component {
  constructor(props) {
    //Props: series, teams, round
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {}

  componentDidMount() {}

  componentDidCatch() {}

  render() {
    if (this.props.round.phase === "freezetime") {
      return (
        <div class={"seriesInfo " + "seriesInfo" + this.props.series.bestOf}>
          <div class="seriesInfo3 seriesInfo">
            {Object.keys(this.props.series.games).map((gameId) => {
              return (
                <div class="seriesMapInfo">
                  <div class="seriesMapInfoTop">
                    {this.props.series.games[gameId].map}{" "}
                    {this.props.series.games[gameId].winner !== "" && (
                      <span>
                        <img
                          class="seriesMapInfoImage"
                          src={this.props.teams.left.img}
                          alt=""
                        ></img>
                        {this.props.teams.left.name ===
                          this.props.series.games[gameId].winner && (
                          <span>
                            {this.props.series.games[gameId].winnerScore}-
                            {this.props.series.games[gameId].loserScore}
                          </span>
                        )}
                        {this.props.teams.right.name ===
                          this.props.series.games[gameId].winner && (
                          <span>
                            {this.props.series.games[gameId].loserScore}-
                            {this.props.series.games[gameId].winnerScore}
                          </span>
                        )}
                        <img
                          class="seriesMapInfoImage"
                          src={this.props.teams.right.img}
                          alt=""
                        ></img>
                      </span>
                    )}
                    {this.props.series.games[gameId].winner === "" && (
                      <span class="seriesMapInfoCurrent">Current</span>
                    )}
                  </div>
                  <div class="seriesMapInfoBottom">
                    {this.props.series.games[gameId].picked !== "decider" && (
                      <span>
                        <span class="seriesMapInfoPickedBy">PICKED BY </span>
                        {this.props.series.games[gameId].picked}
                      </span>
                    )}
                    {this.props.series.games[gameId].picked === "decider" && (
                      <span>Decider Map</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
