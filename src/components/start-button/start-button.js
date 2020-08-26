import React, {Component} from "react";

import './start-button.sass'

export default class StartButton extends Component {
  render() {
    const {startGame} = this.props

    return (
        <button onClick={startGame}>Start</button>
    )
  }
}
