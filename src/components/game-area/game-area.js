import React, {Component} from "react";

import GameAreaItem from "../game-area-item/game-area-item";

import './game-area.sass'

class GameArea extends Component {
  generateItem = (arr) => {
    const {onActive} = this.props
    const newArr = arr.map(item => {
      return (
          <li key={item.key}>
            <GameAreaItem
                onActive={() => onActive(item.key)}
                color={item.color}
                id={item.id}
                active={item.active}
            />
          </li>
      )
    })

    return newArr
  }

  render() {
    const {buttons} = this.props
    const elems = this.generateItem(buttons)
    return (
        <ul className="game-area">
          {elems}
        </ul>
    )

  }
}

export default GameArea
