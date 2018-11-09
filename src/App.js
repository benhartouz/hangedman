import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import words from './words';

const  keys = ["A",'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','R','U','S','T','Y','W','Z'] ; 


const Placeholder = ({ letters }) => {
      return (
        <div>
        {
          letters.map( (letter) => {
            return (
              <span>{letter}</span>
            )
          })
        }
        </div>
      )
}

class App extends Component {

  constructor(props){
      super(props);
      this.state = {
          words : "" , 
          score : 0  , 
          attempt  : 10 , 
          winned : false  , 
          found : 0,
          msg : "" , 
          word :"",
          finshed : false
      }
  }

  componentDidMount(){
      this.generateWord();
  }


  generateWord = () => {
    let randomNum = this.getRandomArbitrary(1,9);
    let word = words[randomNum]; 
    console.log("currentword" , word);
    console.log(word.length);
    this.setState({
      word: word , 
      found : word.length - 1
    })
  }

  /**
   * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
   * @param {} min 
   * @param {*} max 
   */
  getRandomArbitrary( min , max ) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // onClick
  onClick = ( e , key ) => {

    // check if key is already disabled
    if( e.target.attributes[2] !== undefined ) return ;

    if(this.state.finshed){
        return;
    }

    // check if player finish all attempts given .
    if(this.state.attempt === 0){
      this.setState({
        winned : false , 
        msg : "you are loser :(" , 
        finshed : true
      })
      return;
    }
    
    let item = `.item_${key}`
    let elements = document.querySelectorAll(item);
    console.log(elements);
    if( elements.length > 0 ){
        for(let ii = 0 ; ii < elements.length ; ii++){
            elements[ii].innerHTML = key;
        }
        this.setState({
          found : this.state.found - elements.length
        })
    } else {
        let element = document.getElementById(`key_${key}`);
        element.className += " error";
    }
    document.getElementById(`key_${key}`).setAttribute("disabled","disabled");
    this.setState({
      attempt : this.state.attempt - 1
    });

    // check if the player found the word .
    if(this.state.found === 0){
      this.setState({
        winned : true , 
        msg : "you are the winner :)" , 
        finshed : true
      })
      return;
    }

    
  }

  // Render keys
  renderKeys(){
    let keyBoard = keys.map( (key , value) => {
        return <span className="key" 
                      key={key} 
                      onClick={ ( e ) => { this.onClick( e , key ) } } 
                      id={`key_${key}`}>{key}</span>
    })
    return keyBoard;
  }

  resetKeys () {
        for( let ii = 0 ; ii < keys.length ; ii++ ){
          let  element =  document.getElementById(`key_${keys[ii]}`)
          element.removeAttribute("disabled");
          element.className = "key";
        }
  }

  resetPlaceHolder(){
    this.items.map( (elm) => {
      console.log(elm);
      //elm.innerHTML = "";
    })
  }

  resetPartie = (  ) => {
      this.resetPlaceHolder();
      this.resetKeys();
      this.generateWord();
      this.setState({
        score : 0  , 
        attempt  : 10 , 
        winned : false  , 
        msg : "" , 
        finshed : false
      });
  }

  // generate placeholder from whole word
  generatePlaceHolders = () => {
    console.log(this.state.word);
    let splitedWord = this.state.word.split("");
    let placholder  = splitedWord.map( (key,value) => {
      let item = `item_${key.toUpperCase()} item-placeholder`;
      let element = <span key={value} className={item}>_</span>;
      this.items  = [];
      this.items.push(element);
      return (element)
    });
    return placholder;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="body">
            {
               this.state.finshed  && <div><span className="reset" onClick={ () => { this.resetPartie() } }>Reset partie</span>
               </div>
            }
            <div>
              <h2 className={ (this.state.winned) ? "win": "lose" }>{this.state.msg}</h2>
            </div>
            <div id="placeholderContainer">
              {this.generatePlaceHolders()}
            </div>
            <Placeholder letters={[]}/>
            <div id="score">
                <h3>Score</h3><span>{this.state.score}</span>
                <h3>Attempt</h3><span>{this.state.attempt}</span> 
            </div>
            <div id="keyboardContainer">
              {this.renderKeys()}
            </div>
        </div>
      </div>
    );
  }
}

export default App;
