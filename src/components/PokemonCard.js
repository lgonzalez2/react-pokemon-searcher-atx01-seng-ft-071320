import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  constructor() {
    super()

    this.state = {
      clicked: false
    }
  }

  handleClick = () => {
    this.setState(previousState => {
      return {
        clicked: !previousState.clicked
      }
    });
  }

  render() {
    let img = '';

    if (this.state.clicked === false) {
      img = this.props.pokemon.sprites.front 
    } else {
      img = this.props.pokemon.sprites.back
    }

    return (
      <Card>
        <div>
          <div className="image" onClick={this.handleClick}>
            <img src= {img} alt="" />
          </div>
          <div className="content">
          <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
                {this.props.pokemon.hp} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard




