import React, { Component } from "react";
import { Container, Card, Icon } from "semantic-ui-react";
import { API } from "aws-amplify";
import _ from "lodash";
//import EditItemModal from "./editItem.js";
import AddProductModal from "./AddProductsModal";

const apiName = "laravel-bref-demo-1";
const apiPath = "/api/products";

class ProductDashboard extends Component {
  state = {
    products: [],
    activeProduct: null
  };

  getItems = async () => {
    const response = await API.get(apiName, apiPath);

    const products = await response.data;

    this.setState({ products: products, activeProduct: null });
  };

  deleteItem = async id => {
    await API.del(apiName, `${apiPath}/${id}`);
    return await this.getItems();
  };

  getProduct = async id => {
    const response = await API.get(apiName, `${apiPath}/${id}`);
    return await response.data;
  };

  editProduct = id => {
    this.getProduct(id).then(product => {
      this.setState({ activeProduct: product });
    });
  };

  async componentDidMount() {
    this.getItems();
  }

  render() {
    const { products, activeProduct } = this.state;
    return (
      <div>
        <AddProductModal
          refreshItemsMethod={this.getItems}
          product={activeProduct}
        />

        <Container style={{ padding: 10 }}>
          <Card.Group>
            {_.map(products, ({ id, name, detail }) => (
              <Card key={id} link>
                <Card.Content>
                  <Icon
                    style={{ position: "absolute", right: "5px" }}
                    name="edit"
                    title="Edit Product"
                    onClick={() => this.editProduct(id)}
                  />
                  <Icon
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "40px"
                    }}
                    title="Delete Product"
                    name="delete"
                    onClick={() => this.deleteItem(id)}
                  />
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
