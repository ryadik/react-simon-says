import React, {Component} from "react";

export default class StartButton extends Component {
  render() {
    const {startGame} = this.props

    return (
        <button onClick={startGame}>Start</button>
    )
  }
}
