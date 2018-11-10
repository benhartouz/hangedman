import React, { Component } from "react";

class HangMan extends Component {

   constructor(props){
       super(props);
       this.state = {
           step : 0
       }
       console.log("props:",props);
       this.contextCanvas = "";
   }
   
  componentDidMount() {
    let canvas = document.getElementById("myCanvas");
    console.log("canvas:",canvas);
    this.contextCanvas = canvas.getContext("2d");
    console.log("this.context:",this.context);
  }

  static getDerivedStateFromProps(props,state){
      console.log("state.step:",state.step);
      console.log("props.step:",props.step);
      if(state.step !== props.step){
        return {
            step  : props.step
        }
      }
      return null;
  }

  componentDidUpdate(prevProps,prevState){
      if(prevState.step !== this.state.step){
        this.setState({
            step : this.state.step
        });
        for(let ii=0 ; ii < this.state.step ; ii++){
            this.draw(ii);
        }
      }
  }

  draw = (step) => {
    console.log("this.contextCanvas:",this.contextCanvas);
    switch (step) {
      case 0:
        this.contextCanvas.moveTo(0, 400);
        this.contextCanvas.lineTo(200, 400);
        this.contextCanvas.stroke();
        break;
      case 1:
        this.contextCanvas.moveTo(100, 0);
        this.contextCanvas.lineTo(100, 400);
        this.contextCanvas.stroke();
        break;
      case 2:
        this.contextCanvas.moveTo(100, 0);
        this.contextCanvas.lineTo(200, 0);
        this.contextCanvas.stroke();
        break;
      case 3:
        this.contextCanvas.moveTo(200, 0);
        this.contextCanvas.lineTo(200, 60);
        this.contextCanvas.stroke();
        break;
      case 4:
        this.contextCanvas.beginPath();
        this.contextCanvas.arc(200, 90, 30, 0, 2 * Math.PI);
        this.contextCanvas.stroke();
        break;
      case 5:
        this.contextCanvas.moveTo(200, 120);
        this.contextCanvas.lineTo(200, 250);
        this.contextCanvas.stroke();
        break;
      case 6:
        this.contextCanvas.moveTo(200, 150);
        this.contextCanvas.lineTo(250, 200);
        this.contextCanvas.stroke();
        break;
      case 7:
        this.contextCanvas.moveTo(200, 150);
        this.contextCanvas.lineTo(150, 200);
        this.contextCanvas.stroke();
        break;
      case 8:
        this.contextCanvas.moveTo(200, 250);
        this.contextCanvas.lineTo(250, 300);
        this.contextCanvas.stroke();
        break;
      case 9:
        this.contextCanvas.moveTo(200, 250);
        this.contextCanvas.lineTo(150, 300);
        this.contextCanvas.stroke();
        break;
      default:
        return;
    }
  }

  render() {
    return (
      <canvas id="myCanvas" width="300" height="400">
        Your browser does not support the HTML5 canvas tag.
      </canvas>
    );
  }
}

export default HangMan;
