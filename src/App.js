import React, {Component} from 'react';
import GameArea from './components/game-area/game-area'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        {color: 'blue', key: this.randomKey(), id: 1, active: false},
        {color: 'red', key: this.randomKey(), id: 2, active: true},
        {color: 'yellow', key: this.randomKey(), id: 3, active: false},
        {color: 'green', key: this.randomKey(), id: 4, active: false},
      ]
    }
  }

  randomKey = () => {
    return Math.random().toString(36).substr(6)
  }

  onLol = (key) => {
    const index = this.state.buttons.findIndex(elem => elem.key === key)
    console.log(index)
    // console.log(this.state.buttons)
  }

  render() {
    return (
      <div className="app">
        <h1 className="title">Simon Says</h1>
        <GameArea
          buttons={this.state.buttons}
          onLol={this.onLol}
        />
      </div>
    )
  }
}

export default App;
