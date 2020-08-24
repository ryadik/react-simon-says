import React, {Component} from "react";

import OptionsRound from "../options-rounds/options-round";
import StartButton from "../start-button/start-button";

import './options-area.sass'

export default class OptionsArea extends Component {
  render() {
    const {startGame} = this.props

    let {round} = this.props
    if (round === undefined || round === 0 || isNaN(round)) {
      round = 0
    }

    return(
        <div className="options-area">
          <OptionsRound round={round}/>
          <StartButton startGame={() => startGame()}/>
        </div>
    )
  }
}
