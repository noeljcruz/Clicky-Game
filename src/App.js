import React, { Component } from "react";
import Nav from "./components/Nav";
import pokemon from "./pokemon.json";
import Card from "./components/Card";
import "./App.css";

class App extends Component {

  state = {
    pokemon,
    title: "Pokemon Memory Game",
    score: 0,
    topScore: 0,
    message: "Click any Pokemon to start...but don't choose the same one twice!",
    clicked: []
  }

  componentDidMount() {
    this.setState({ pokemon: this.shuffle(this.state.pokemon) })
  }

  clickedCard = (id) => {
    console.log(this.state)
    if (this.state.clicked.indexOf(id) === -1) {
      let newClicked = this.state.clicked
      newClicked.push(id)
      let newscore = this.state.score + 1 > this.state.topScore ? this.state.score + 1 : this.state.topScore
      this.setState({
        pokemon: this.shuffle(this.state.pokemon),
        score: this.state.score + 1,
        topScore: newscore,
        message: "Keep it up! Gotta catch 'em all!",
        clicked: newClicked
      })

    }
    else {
      this.setState({
        pokemon: this.shuffle(this.state.pokemon),
        score: 0,
        message: "You already caught that Pokemon! Try again.",
        clicked: [],
      });
    }
  }

  shuffle = pokemon => {
    // https://stackoverflow.com/a/43235780/10503606

    let newPokemon = pokemon.sort(() =>
      Math.random() - 0.5);
    return newPokemon;
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
          {this.state.pokemon.map(item => (
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
