import React, {Component} from "react";
import './game-area-item.sass'

class GameAreaItem extends Component {
  render() {
    const {id, color, active, onActive} = this.props
    let classNames = `${color}`
    classNames += (active) ? ` ${color}_active` : ''

    return (
        <>
          <button onClick={onActive}
                  className={classNames}
                  data-id={id}>
          </button>
        </>
    )
  }
}

export default GameAreaItem
