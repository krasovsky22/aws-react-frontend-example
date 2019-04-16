import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.css";
import { Segment, Menu, Icon } from "semantic-ui-react";

import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";

import ProductsDashboard from "./components/ProductsDashboard";

Amplify.configure(aws_exports);

class App extends Component {
  state = {
    todoList: []
  };

  render() {
    return (
      <Segment>
        <Menu>
          <Menu.Item name="home">
            <Icon name="shop" />
          </Menu.Item>
          <Menu.Item name="Items" />
          <Menu.Item name="aboutUs" />
        </Menu>
        <ProductsDashboard />
      </Segment>
    );
  }
}

export default App;
