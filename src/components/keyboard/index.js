import React , { Component } from 'react';

class KeyBoard extends Component {

    onClick = ( key ) => {
        return key;
    }

    renderKeys(){
        const  keys = ["A",'B','C','D','E','F','G','H','I','J','L','M','N','O','P','K','R','U','S','T','Y','W','Z'] ; 
        let keyBoard = keys.map( (key , value) => {
            return <span className="key" key={key} onClick={ () => { this.onClick(key) } }>{key}</span>
        })
        return keyBoard;
    }

    render(){
        return (
            <div className='keyboardContainer'>
                {this.renderKeys()}
            </div>
       )
    }
    
}

export default KeyBoard;