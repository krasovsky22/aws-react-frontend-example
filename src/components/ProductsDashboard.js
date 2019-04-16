import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
import { API } from "aws-amplify";
import _ from "lodash";
//import EditItemModal from "./editItem.js";
import AddProductModal from "./AddProductsModal";

const apiName = "laravelApiNew";
const apiPath = "/api/products";

class ProductDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], modalOpen: false };
  }

  getItems = async () => {
    console.log("here", this);
    const response = await API.get(apiName, apiPath);

    const products = await response.data;

    this.setState({ products: products });
  };

  async componentDidMount() {
    this.getItems();
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <AddProductModal refreshItemsMethod={this.getItems} />

        <Container style={{ padding: 10 }}>
          <Card.Group>
            {_.map(products, ({ id, name, detail }) => (
              <Card key={id}>
                <Card.Content>
                  <Card.Header>{name}</Card.Header>
                  <Card.Description>{detail}</Card.Description>
                </Card.Content>
                {/* <EditItemModal
                  item={Object.values(this.state.item)}
                  getItems={this.getItems}
                /> */}
              </Card>
            ))}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default ProductDashboard;
