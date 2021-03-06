import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import GameList from './GameList';
import GameDetail from './GameDetail';
import AddGameForm from './AddGameForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      games: [],
      current: {},
      nameVal: '',
      minVal: '',
      maxVal: ''
    }
    this.handleGameClick = this.handleGameClick.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleMinChange = this.handleMinChange.bind(this)
    this.handleMaxChange = this.handleMaxChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Function to handle clicking on a game (shows game details)
  handleGameClick(e) {
    e.stopPropagation()
    this.setState({
      current: this.state.games[parseInt(e.target.id)]
    })
  }

  handleNameChange(e) {
    this.setState({
      nameVal: e.target.value
    })
  }

  handleMinChange(e) {
    this.setState({
      minVal: e.target.value
    })
  }

  handleMaxChange(e) {
    this.setState({
      maxVal: e.target.value
    })
  }

  handleSubmit(e) {
    // Add your code here to handle adding a new game to the database
    // console.log(this.state.nameVal)
    // get the object being submitted
    let newGame = {
      name: this.state.nameVal,
      minPlayers: +this.state.minVal,
      maxPlayers: +this.state.maxVal
    }
    // do the axios post call with the new object
    // once you get the response set the state to the new
    // data.  be sure to use spread or make a copy of
    // existing state before attempting to modify
    axios.post('/api/cardgames/', newGame)
    .then((response) => {
      this.setState({
        games: [...this.state.games, newGame],
        nameVal: '',
        minVal: '',
        maxVal: ''
      })
    }).catch(error => console.log(error))
  }

  // API call goes here so that data is available after component mounts
  // this is where async call happens when the page is loaded
  // when you call axios there is a sub folder for data
  componentDidMount() {
    axios.get('/api/cardgames').then(result => {
      this.setState({
        games: result.data
      })
    })
  }

  render() {
    return (
      <div>
        <GameList onGameClick={this.handleGameClick} games={this.state.games} />
        <GameDetail game={this.state.current} />
        <AddGameForm
          name={this.state.nameVal}
          min={this.state.minVal}
          max={this.state.maxVal}
          onNameChange={this.handleNameChange}
          onMinChange={this.handleMinChange}
          onMaxChange={this.handleMaxChange}
          onSubmit={this.handleSubmit}
           />
      </div>
    );
  }
}

export default App;
