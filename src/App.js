import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Container, Header, Icon, Message } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      quantity: '',
      brand: '',
			date: '',
			request: '',
			showSnackBar: false
    }
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

	componentWillUnmount(){
		this.setState({
      item: '',
      quantity: '',
      brand: '',
			date: '',
			request: '',
			showSnackBar: false
    })
	}

	// this function makes post API call in excel sheet 
	StoreDataInSheetApiCall = () => {
		axios.post('https://sheet.best/api/sheets/04ed69c0-c4e3-4d6a-bbb7-84bcaedbd6eb', this.state)
    .then(response => {
      console.log(response);
			this.setState({
				item: '',
				quantity: '',
				brand: '',
				date: '',
				request: '',
				showSnackBar: true
			})

			setTimeout(()=>{
				this.setState({
					showSnackBar: false
				})
			}, 3500);
    }).catch(err => console.log(err))
	}

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
		const d = new Date();

		// this makes the API call after date has been added in state
		this.setState({
			date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}` 
		}, () => this.StoreDataInSheetApiCall())
  }

  render() {
    const { item, quantity, brand, date, request } = this.state; 
    return (
      <Container fluid className="container">
				<nav>
					<Link className="nav-button" to="/list">
						<Icon size='big' name='list alternate outline' />
						<Header as='h3'>List</Header>
					</Link>
				</nav>

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

					<Form.Field>
            <label>Requested by</label>
            <input placeholder='Fayesal' type="text" name="request" value={request} onChange={this.changeHandler}  />
          </Form.Field>
          <Button className="sub-button" color="blue" type='submit'>Submit</Button>
        </Form>

				{ this.state.showSnackBar &&
					<Message compact positive>
						<Message.Header>
							<Icon color='green' name='check' />
							Details added
						</Message.Header>
					</Message>
				}
      </Container>
    );
  }
}
 
export default App;
