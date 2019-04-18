import React, { Component } from "react";
import { Form, Modal, Button } from "semantic-ui-react";
import { API } from "aws-amplify";

const apiName = "laravel-bref-demo-1";
const apiPath = "/api/products";

const defaultState = {
  name: "",
  detail: "",
  id: "",
  modalOpen: false
};

class AddProductModal extends Component {
  state = defaultState;

  hasProduct = () => this.state.id !== "";

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    const { name, detail, id } = this.state;

    if (id !== "") {
      //edit action
      const newApiPath = `${apiPath}/${id}?name=${name}&detail=${detail}`;
      await API.put(apiName, newApiPath);
    } else {
      //save action
      const newApiPath = `${apiPath}?name=${name}&detail=${detail}`;
      await API.post(apiName, newApiPath);
    }

    this.props.refreshItemsMethod();
    this.handleClose();
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.modalOpen === false && nextProps.product) {
      const { id, name, detail } = nextProps.product;
      this.setState({
        modalOpen: true,
        id,
        name,
        detail
      });
    }
  }

  handleOpen = () =>
    this.setState({
      modalOpen: true,
      name: "",
      detail: ""
    });

  handleClose = () => this.setState(defaultState);

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>+ Add Product</Button>}
        closeIcon={true}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>
          {this.hasProduct() ? "Edit" : "Add"} Product
        </Modal.Header>
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
