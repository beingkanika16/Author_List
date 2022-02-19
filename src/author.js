import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Toast, ToastContainer } from 'react-bootstrap';
import React from 'react';
function Author() {
	const [authorName, setAuthorName] = React.useState()
	const [authorDesc, setAuthoDesc] = React.useState()

	const [open, setOpen] = React.useState(false)

	const clicked = (e) => {
		setOpen(true)
		var data = authorName && authorName.results.filter((des) => e.target.innerHTML === des.name)
		setAuthoDesc(data[0].bio)

	}
	const handleClose = () => {
		setOpen(false)
	}
	React.useEffect(() => {
		let fetchRes = fetch(
			"https://api.quotable.io/authors");

		// fetchRes is the promise to resolve
		// it by using.then() method
		fetchRes.then(res =>
			res.json()).then(d => {
				setAuthorName(d)
			})
	}, [])
	const onCopy = async () => {
		await navigator.clipboard.writeText(authorDesc);
		alert('TextCopied')
	}
	return (
		<div className="Author" style={{ width: '25%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'gray' }}>
			<div><h3>Author's  List</h3></div>
			<div style={{ overflowY: 'auto', height: '20rem' }}>
				{authorName && authorName.results.map((item, i) => <ul key={item.quoteCount} className="list-group">

					<li className={"list-group-item list-group-item-primary"} onClick={(e) => clicked(e)}>{item.name}</li>
					<></>
				</ul>)}
			</div>
			<Modal show={open} >
				<Modal.Header >
					<Modal.Title>Author's Bio</Modal.Title>
				</Modal.Header>
				<Modal.Body>{authorDesc}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={onCopy}>
						<i className="bi bi-clipboard">    Copy to Clipboard
						</i>
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Author;
