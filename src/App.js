import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Amplify, { API } from "aws-amplify";
import aws_exports from "./aws-exports";

Amplify.configure(aws_exports);

const apiName = "laravelApi";
const path = "/api/products";

class App extends Component {
  componentDidMount() {
    API.get(apiName, path).then(response => {
      console.log(response);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
