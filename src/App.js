import React, {Component} from 'react';

import './App.sass'

import GameArea from './components/game-area/game-area'
import OptionsArea from "./components/options-area/options-area";

import soundBlue from './assets/sounds/1.mp3'
import soundRed from './assets/sounds/2.mp3'
import soundYellow from './assets/sounds/3.mp3'
import soundGreen from './assets/sounds/4.mp3'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 0,
      delay: 1500,
      gameSequence: [],
      userSequence: [],
      isGaming: false,
      buttons: [
        {color: 'blue', sound: new Audio(soundBlue), key: this.randomKey(), id: 1, active: false},
        {color: 'red', sound: new Audio(soundRed), key: this.randomKey(), id: 2, active: false},
        {color: 'yellow', sound: new Audio(soundYellow), key: this.randomKey(), id: 3, active: false},
        {color: 'green', sound: new Audio(soundGreen), key: this.randomKey(), id: 4, active: false},
      ],
      difficulties: [
        {level: 'easy', delay: 1500, text: 'Легкий', key: this.randomKey()},
        {level: 'medium', delay: 1000, text: 'Средний', key: this.randomKey()},
        {level: 'hard', delay: 400, text: 'Сложный', key: this.randomKey()}
      ],
    }
  }

  // generators
  randomKey = () => {
    return Math.random().toString(36).substr(6)
  } // return string in 6 chars
  randomNum = () => {
    return Math.round(0.5 + Math.random() * 4)
  } // return number in 1 through 4
  generateStep = () => {
    this.setState(({gameSequence}) => {
      const newArr = [...gameSequence]

      while (true) {
        const newStep = this.randomNum()
        if (newStep !== newArr[newArr.length - 1]) {
          newArr.push(newStep)
          break
        }
      }

      return {
        gameSequence: newArr
      }
    })
  } // push new elem to gameSequence


  // work with sequences
  clearSequence = (start = false) => {
    if (start) {
      this.setState({
        userSequence: [],
        gameSequence: []
      })
    } else {
      this.setState({userSequence: []})
    }
  } // clear the sequences
  fillUserSequence = (key) => {
    this.setState(({userSequence}) => {
      const {buttons} = this.state
      const newArr = [...userSequence]
      newArr.push(buttons.findIndex(item => item.key === key) + 1)

      return {
        userSequence: newArr
      }
    })
  } // add new num to userSequence
  compareSequences = () => {
    const {gameSequence, userSequence} = this.state

    if (userSequence.length > gameSequence.length) {
      return false
    } else {
      let equals = 0
      userSequence.forEach((item, i) => {
        if (item === gameSequence[i]) {
          equals++
        }
      })
      if (equals === userSequence.length) {
        return true
      }
    }
  } // compares userSequence and gameSequence
  demoSequence = () => {
    const {gameSequence, buttons, delay} = this.state

    gameSequence.forEach((step, i) => { // iterating gameSequence array
      setTimeout(() => {

        buttons.forEach(btn => { // iterating buttons array
          if (btn.id === step) {
            this.activeState(btn.key)
          }
        })

      }, delay * i)
    })
  } // show gameSequence


  // active state
  onActive = (key) => {
    this.activeState(key)
        .then(() => {
          const {isGaming} = this.state
          if (isGaming) {
            this.fillUserSequence(key)
            this.gameSession()
                .catch(() => console.log('Произошла ошибка'))
          }
        })
  } // active state for buttons and update userSequence
  activeState = async (key) => {
    this.updateActive(key)
    this.playSound(key)
    await setTimeout(() => {this.updateActive(key)}, 200)
  } // active state for demonstrations
  updateActive = (key) => {
    this.setState(({buttons}) => {
      const newArr = [...buttons]

      newArr.forEach(item => {
        if (item.key === key) {
          item.active = !item.active
        }
      })

      return {
        buttons: newArr
      }
    })
  } // update active button's state


  // rounds
  newRound = async (start = false) => {
    this.setState(({round}) => {
      const roundNum = (start) ? 1 : ++round
      return {
        round: roundNum
      }
    })
    await this.clearSequence(start)
    await this.generateStep()
  } // change round number and call generateStep() and demoSequence
  startNewRound = () => {
    this.newRound()
        .then(() => console.log('Start Round ' + this.state.round))
        .then(this.demoSequence)

  } // new round


  // game process
  startGame = () => {
    this.setState({isGaming: true})
    this.newRound(true)
        .then(() => console.log('Start Round 1'))
        .then(this.demoSequence)

    console.log('Game is start')
  } // start gameSession
  gameSession = async () => {
    const {gameSequence, userSequence} = this.state
    const compareResult = await this.compareSequences()

    if (!compareResult) {
      this.gameOver()
    } else if (userSequence.length === gameSequence.length && compareResult) {
      setTimeout(this.startNewRound, 1000)
    }
  } // data processing of sequences
  gameOver = () => {
    this.clearSequence(true)
    this.setState({round: 0, isGaming: false})

    console.log('Game Over :(')
  } // end game session


  // other
  setDelay = (delay) => {
    this.setState({delay})
  } // delay between activating buttons
  playSound = (key) => {
    const {buttons} = this.state
    buttons.forEach(item => {
      if (item.key === key) {
        item.sound.play()
      }
    })
  } // click or demo to play sound
  show = () => {
    const {userSequence, gameSequence} = this.state
    console.log(`user: ${userSequence}`)
    console.log(`game: ${gameSequence}`)
    console.log(`delay: ${this.state.delay}`)
  } // dev func

  render() {
    return (
      <>
        <div className="background"></div>
        <div className="app">
          <section className="app__content">
            <header className="header">
              <h1 className="header__title" onClick={this.show}>
                <span className="blue">Sim</span>
                <span className="red">on</span>
                &#160;
                <span className="yellow">Sa</span>
                <span className="green">y's</span>
              </h1>
            </header>
            <main>
              <GameArea
                buttons={this.state.buttons}
                onActive={this.onActive}
              />
              <OptionsArea
                  round={this.state.round}
                  startGame={this.startGame}
                  diffs={this.state.difficulties}
                  setDelay={this.setDelay}
              />
            </main>
          </section>
          <footer>
            <p>©Copyright - 2020</p>
            <p>Created by <a href="https://github.com/K1nGsmaN-hub" target="_blank">K1nGsmaN</a></p>
          </footer>
        </div>
      </>
    )
  }
}

export default App;
