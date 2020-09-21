import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {

  constructor() {
    super()

    this.state = {
      pokemons: [],
      loaded: false,
      filteredBy: ''
    }
  }

  getPokemons = () => {
    fetch('http://localhost:3000/pokemon')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            pokemons: result,
            loaded: true
          });
        }
      )
  }

  addPokemon = (event) => {
    fetch("http://localhost:3000/pokemon", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": event.target.name.value,
        "hp": event.target.hp.value,
        "sprites": {
          "front": event.target.frontUrl.value,
          "back": event.target.backUrl.value
        }
      })
    })
    .then(res => res.json())
    .then(data => this.setState({
      pokemons: [...this.state.pokemons, data]
    }))
  }

  filterSearch = (event) => {
    this.setState({
      filteredBy: event.target.value
    });
  }
  

  render() {
    if (this.state.loaded === false) {
      this.getPokemons()
    };

    const filteredPokemon = this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.filteredBy))

    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon= {this.addPokemon}/>
        <br />
        <Search filterSearch= {this.filterSearch}/>
        <br />
        <PokemonCollection pokemons= {filteredPokemon}/>
      </Container>
    )
  }
}

export default PokemonPage





