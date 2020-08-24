import React, {Component} from "react";
import './game-area-item.css'

class GameAreaItem extends Component {
  render() {
    const {id, color, active, onLol} = this.props
    let classNames = `${color}`
    classNames += (active) ? ' active' : ''

    return (
        <>
          <button onClick={onLol} className={classNames} data-id={id}>

          </button>
        </>
    )
  }
}

export default GameAreaItem
