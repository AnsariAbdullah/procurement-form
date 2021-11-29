import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Header, Card, Icon, Modal, Button, Message } from 'semantic-ui-react';

const List = () => {

	const [data, setData] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [showSnackBar, setShowSnackBar] = useState(false);
	const [modalInfo, setModalInfo] = useState({
		index: '',
		item: '',
		quantity: '',
		brand: '',
		request: '',
		date: ''
	});

	useEffect(()=>{
		axios.get(`https://sheet.best/api/sheets/04ed69c0-c4e3-4d6a-bbb7-84bcaedbd6eb`)
		.then(response => {
			console.log(response)
			setData(response.data)
		})
		.catch(err => console.log(err))
	}, [modalOpen])

	// delete item function
	const deleteData = (arrayIndex) => {
		fetch(`https://sheet.best/api/sheets/04ed69c0-c4e3-4d6a-bbb7-84bcaedbd6eb/${arrayIndex}`, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((data) => {
				setModalOpen(false)
				setShowSnackBar(true)

				setTimeout(()=>{
					setShowSnackBar(false)
				}, 3500);

				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	// open modal and store data inside state 
	const openModal = (items, indexNumber) => {
		console.log('Items inside => ', items, 'Index Number of item', indexNumber);
		setModalOpen(true);
		setModalInfo({
			index: indexNumber,
			item: items.item,
			quantity: items.quantity,
			brand: items.brand,
			request: items.request,
			date: items.date
		})
	}

	// will unMount
	useEffect(()=>{
		return () => {
			// console.log('List unmounted')
			setData([]);
			setModalOpen(false);
			setShowSnackBar(false)
			setModalInfo({
				index: '',
				item: '',
				quantity: '',
				brand: '',
				request: '',
				date: ''
			})
    };
	}, [])

	// console log modal items
	// useEffect(()=>{
	// 	console.log(modalInfo);
	// }, [modalInfo])

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
								<Button onClick={()=>openModal(item, index)} basic color='red'>
									Delete
								</Button>
							</div>
						</Card.Content>
					</Card>
				)}
			</Card.Group>

			<Modal
        dimmer='blurring'
				size='tiny'
				closeOnEscape={true}
    		closeOnDimmerClick={false}
        open={modalOpen}
				onClose={() => setModalOpen(false)}
      	onOpen={() => setModalOpen(true)}
      >
        <Modal.Header>Delete Item - {modalInfo.item}</Modal.Header>
        <Modal.Content>
          Do you want to delete <strong>{modalInfo.item}</strong> requested by {modalInfo.request} on {modalInfo.date}
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setModalOpen(false)}>
            No
          </Button>
          <Button positive onClick={() => deleteData(modalInfo.index)}>
            <Icon name='trash' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>

			{ showSnackBar &&
				<Message compact positive>
					<Message.Header>
						<Icon color='green' name='check' />
						Item deleted
					</Message.Header>
				</Message>
			}
		</Container>
	);
}
 
export default List;