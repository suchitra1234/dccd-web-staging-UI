import React, { Component } from "react";
//import ServiceCalls from "../repository/serviceCalls";
import axios from "axios";

class test extends Component{
  constructor(props) {
      super(props);
      this.state ={
        character :{},
        count :0
      //  notes :"Hello"

      };
      this.handleClick = this.handleClick.bind(this);
      }
    /*  axios.get('http://localhost:3000/type')
      .then(response => response.data())
      .then(data => {})
      const {notes} = this.state;
      console.log(notes)
    })*/
    handleClick() {
      this.setState(prevState =>{
        return {
          count : prevState.count +1
        }

      }) 

 }

  /*  componentDidMount() {
            fetch("http://localhost:3000/type")
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        character: data
                    })
                })
        }
*/
render(){

  return (
    <div>
      <h1>{this.state.count}</h1>

      <button onClick={this.handleClick}>click me </button>
    </div>

  );
}
}
export default test
