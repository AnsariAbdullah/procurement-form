import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Header, Card, Icon, Button } from 'semantic-ui-react';

const List = () => {

	const [data, setData] = useState([])

	useEffect(()=>{
		axios.get(`https://sheet.best/api/sheets/04ed69c0-c4e3-4d6a-bbb7-84bcaedbd6eb`)
		.then(response => {
			console.log(response)
			setData(response.data)
		})
		.catch(err => console.log(err))
	}, [])

	const deleteData = (arrayIndex) => {
		fetch(`https://sheet.best/api/sheets/04ed69c0-c4e3-4d6a-bbb7-84bcaedbd6eb/${arrayIndex}`, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<Container fluid className="container">
			<nav>
				<Link className="nav-button" to="/">
					<Icon size='big' name='home' />
					<Header as='h3'>Form</Header>
				</Link>
			</nav>


		  <Card.Group>
				{data.map((item, index) =>
					<Card key={index}>
						<Card.Content>
							<Card.Header>{item.item}</Card.Header>
							<Card.Meta>{item.brand} - {item.quantity}</Card.Meta>
							<Card.Description>
								Requested by <strong>{item.request}</strong> on <strong>{item.date}</strong>
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<div className='ui two buttons'>
								{/* <Button basic color='green'>
									Copy to clipboard
								</Button> */}
								<Button onClick={()=>deleteData(index)} basic color='red'>
									Delete
								</Button>
							</div>
						</Card.Content>
					</Card>
				)}
			</Card.Group>
		</Container>
	);
}
 
export default List;