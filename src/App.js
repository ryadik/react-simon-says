import React, {Component} from 'react';

import GameArea from './components/game-area/game-area'
import OptionsArea from "./components/options-area/options-area";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 0,
      gameSequence: [],
      userSequence: [],
      buttons: [
        {color: 'blue', key: this.randomKey(), id: 1, active: false},
        {color: 'red', key: this.randomKey(), id: 2, active: false},
        {color: 'yellow', key: this.randomKey(), id: 3, active: false},
        {color: 'green', key: this.randomKey(), id: 4, active: false},
      ]
    }
  }

  randomKey = () => {
    return Math.random().toString(36).substr(6)
  }

  randomNum = () => {
    return Math.round(0.5 + Math.random() * 4)
  }

  generateStep = () => {
    this.setState(({gameSequence}) => {
      const newArr = gameSequence
      newArr.push(this.randomNum)

      return {
        gameSequence: newArr
      }
    })
  }

  onActive = (key) => {
    const updateState = (boolean) => {
      this.setState(({buttons}) => {
        const newArr = buttons
        newArr.forEach(item => {
          if (item.key === key) {
            item.active = !!boolean
          }
        })
        return {
          buttons: newArr
        }
      })
    }
    const req = new Promise((resolve, reject) => {
      updateState(1)

      setTimeout(() => {
        resolve(key)
      }, 1000)

    })
    .finally(() => {
        updateState(0)
    })

    console.log(req)
  }

  startGame = () => {
    this
  }

  render() {
    return (
      <div className="app">
        <h1 className="title">Simon Says</h1>
        <GameArea
          buttons={this.state.buttons}
          onActive={this.onActive}
        />
        <OptionsArea
            round={this.state.round}
            startGame={this.startGame}
        />
      </div>
    )
  }
}

export default App;
