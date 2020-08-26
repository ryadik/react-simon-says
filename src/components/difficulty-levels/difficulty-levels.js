import React, {Component} from "react";

import './difficulty-levels.sass'

export default class DifficultyLevels extends Component {
  render() {
    const {level, delay, text, setDelay} = this.props
    return (
      <>
        <input type="radio"
               name="difficulty"
               className="difficulty-levels"
               data-level={level}
               data-delay={delay}
               defaultChecked={delay === 1500}
               onClick={setDelay}
        />
        {text}
      </>
    )
  }
}
