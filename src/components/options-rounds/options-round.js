import React, {Component} from "react";

export default class OptionsRound extends Component {
  render() {
    const {round} = this.props

    return (
        <h2>Round {round}</h2>
    )
  }
}
