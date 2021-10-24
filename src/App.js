import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      quantity: '',
      brand: ''
    }
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);

    axios.post('https://sheet.best/api/sheets/04ed69c0-c4e3-4d6a-bbb7-84bcaedbd6eb', this.state)
    .then(response => {
      console.log(response);
			this.setState({
				item: '',
				quantity: '',
				brand: ''
			})
    })
  }

  render() {
    const { item, quantity, brand } = this.state; 
    return (
      <Container fluid className="container">
        <Header className="heading" as='h2'>MS Salahuddin procurement form</Header>
        <Form className="form" onSubmit={this.submitHandler}>
          <Form.Field>
            <label>Item</label>
            <input placeholder='Natraj Pencil' type="text" name="item" value={item} onChange={this.changeHandler}  />
          </Form.Field>
          <Form.Field>
            <label>Quantity</label>
            <input placeholder='10' type="number" name="quantity" value={quantity} onChange={this.changeHandler}  />
          </Form.Field>
          <Form.Field>
            <label>Brand</label>
            <input placeholder='Natraj' type="text" name="brand" value={brand} onChange={this.changeHandler}  />
          </Form.Field>
          <Button className="sub-button" color="blue" type='submit'>Submit</Button>
        </Form>
      </Container>
    );
  }
}
 
export default App;
