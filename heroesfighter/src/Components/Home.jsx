import React from 'react';
import ArenaFight from './ArenaFight';
import CardChoice from './CardChoice';
import { Switch, Route } from 'react-router-dom';
import Pageaccueil from './Pageaccueil';
import Rules from './Rules';


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      items : [],
      selectedCard : '',
      selectedHero : [],
      chooseCard : null,
      opponent : null,
      arene:['https://image.noelshack.com/fichiers/2019/43/4/1571903698-anime-street-scenic-buildings-bicycle-cars-road-clouds-anime-6573.jpg','https://resize-parismatch.lanmedia.fr/r/901,,forcex/img/var/news/storage/images/paris-match/actu/sport/la-ceremonie-d-ouverture-en-direct-et-en-images-1456046/rtx4ti7w/23927390-1-fre-FR/RTX4TI7W.jpg','https://i.pinimg.com/originals/e6/4d/81/e64d8126faaecd40d8961348b1967190.jpg','https://img.elo7.com.br/product/zoom/1CAA62C/painel-gravity-falls-2-00x1-50-desenho-disney.jpg','https://i.pinimg.com/originals/5c/d6/ba/5cd6bacfc547f89a6b3b7c8d1dc557ab.jpg'],
    })
    this.handleCardSelection = this.handleCardSelection.bind(this)
    this.getResult= this.getResult.bind(this)
    this.opacity = this.opacity.bind(this)
    this.getOpponent = this.getOpponent.bind(this)
    this.getArena = this.getArena.bind(this)
  }
  getArena (){
    return  Math.floor(Math.random()*this.state.arene.length )
  }

 
  getSuperHero(i = 1 ) {

    const randomId = Math.floor(Math.random() * 730 + 1);

    fetch('https://www.superheroapi.com/api.php/157312608676119/' + randomId)
            .then(res => res.json())
            .then(json =>{
                if (json.powerstats.intelligence !== "null"){
                  this.setState({
                      items : [...this.state.items, json],
                  })
                  i++
                }
                i <= 3 && this.getSuperHero(i)
              })
  }

  componentDidMount () {
    this.getSuperHero()
  }

  // getFiltered() {
  //   for (let i = 1; i <= 3; i++) {
  //     let randomHero = 0
  //     do {
  //       randomHero = Math.floor(Math.random() * this.state.items.length)
  //     } while ( this.state.selectedHero.filter( selected => selected.name === this.state.items[randomHero].name).length !== 0)
  //   }
  // }

  getOpponent (i = 1) {
    
    const randomId = Math.floor(Math.random() * 730 + 1);

    fetch('https://www.superheroapi.com/api.php/157312608676119/' + randomId)
            .then(res => res.json())
            .then(json =>{
                if (json.powerstats.intelligence !== "null"){
                  this.setState({
                    opponent : json,
                  })
                  i++
                }
                i < 2 && this.getOpponent(i)
              })
  }


  getResult() {

    const calcul = stats => {
      const power = parseInt(stats.powerstats.power)
      return power
    }

    console.log(calcul(this.state.chooseCard))
    console.log(calcul(this.state.opponent))

    if (calcul(this.state.chooseCard) <= calcul(this.state.opponent)) {
      return console.log('You Loose !')      
    } else if  (calcul(this.state.chooseCard) > calcul(this.state.opponent)) {
      this.getOpponent()
      return console.log('You WIN !')
    }
  }

  handleCardSelection(cardName){
    this.setState({selectedCard : cardName})
    cardName === "choose1" 
      ? this.setState({chooseCard: this.state.items[0]}) 
      : cardName === "choose2" 
      ? this.setState({chooseCard: this.state.items[1]}) 
      : cardName === "choose3" 
      ? this.setState({chooseCard: this.state.items[2]})
      : this.setState({chooseCard: null })
  }

  opacity (cardName) {
    return {
      opacity : this.state.selectedCard === '' || this.state.selectedCard === cardName ? 1 : 0.2
    }
  }

  render() {

    const { items, selectedCard, chooseCard, opponent, arene } = this.state;

    if ( items.length !== 3 ) {
      return (
        <div className='loading'>
          <h4 className='load_text'>Loading...</h4>
          <div className="three col">
            <div className="loader" id="loader-6">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='home'>
          
          <Switch>
            <Route exact path = '/' component = {Pageaccueil} /> 
            <Route exact path = '/rules' component = {Rules} /> 
            <Route path = '/cardchoice' render = {() =><CardChoice itemschoice={items[0]} itemschoice2={items[1]} itemschoice3={items[2]} handleCardSelection={this.handleCardSelection} selectedCard={selectedCard} opacity={this.opacity} getOpponent={this.getOpponent} />}/>
            <Route path='/arena' render = {() =><ArenaFight getArena={this.getArena} mycard={chooseCard} opponent={opponent} getResult={this.getResult} arene={arene} />}/>
          </Switch> 
          
        </div>
      )
    }
  }
}

export default Home;
