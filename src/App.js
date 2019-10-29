import React, { Component } from "react";
import Nav from "./components/Nav";
import maps from "./map.json";
import Card from "./components/Card";
import "./App.css";

class App extends Component {

  state = {
    maps,
    title: "Pokemon Memory Game",
    score: 0,
    topScore: 0,
    message: "Click any Pokemon to start...but don't choose the same one twice!",
    clicked: []
  }

  componentDidMount() {
    this.setState({ maps: this.shuffle(this.state.maps) })
  }

  clickedCard = (id) => {
    console.log(this.state)
    if (this.state.clicked.indexOf(id) === -1) {
      let newClicked = this.state.clicked
      newClicked.push(id)
      let newscore = this.state.score + 1 > this.state.topScore ? this.state.score + 1 : this.state.topScore
      this.setState({
        maps: this.shuffle(this.state.maps),
        score: this.state.score + 1,
        topScore: newscore,
        message: "Keep it up! Gotta catch 'em all!",
        clicked: newClicked
      })

    }
    else {
      this.setState({
        maps: this.shuffle(this.state.maps),
        score: 0,
        message: "You already caught that Pokemon! Try again.",
        clicked: [],
      });
    }
  }

  shuffle = maps => {
    // https://stackoverflow.com/a/43235780/10503606

    let newMaps = maps.sort(() =>
      Math.random() - 0.5);
    return newMaps;
  }

  render() {
    return (
      <div>
        <Nav
          message={this.state.message}
          score={this.state.score}
          topScore={this.state.topScore}
        />
        <div className="flags-container">
          {this.state.maps.map(item => (
            <Card
              country={item.country}
              id={item.id}
              img={item.img}
              clickedCard={this.clickedCard}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App;
