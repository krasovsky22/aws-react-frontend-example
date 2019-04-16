import React, { Component } from "react";
import { Form, Modal, Button } from "semantic-ui-react";
import { API } from "aws-amplify";

const apiName = "laravelApi";
const apiPath = "/api/products";

class AddProductModal extends Component {
  state = {};

  handleChange = (event, { name, value }) => {
    console.log(event, name, value);
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    const { name, detail } = this.state;
    console.log(this.state);

    let newApiPath = `${apiPath}?name=${name}&detail=${detail}`;

    await API.post(apiName, newApiPath);

    this.props.refreshItemsMethod();
    this.handleClose();
  };

  handleOpen = () =>
    this.setState({
      modalOpen: true,
      name: "",
      detail: ""
    });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>+ Add Product</Button>}
        closeIcon={true}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Add Product</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group unstackable widths={2}>
              <Form.Input
                name="name"
                label="Item Name"
                placeholder="Enter Item Name..."
                onChange={this.handleChange}
                value={this.state.name}
              />
            </Form.Group>
            <Form.TextArea
              name="detail"
              label="Product Details"
              placeholder="Add a Description of the Product..."
              onChange={this.handleChange}
              value={this.state.detail}
            />

            <Form.Button type="submit">Submit</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddProductModal;
