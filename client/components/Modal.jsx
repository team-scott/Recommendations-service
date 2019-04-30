import React, {Component} from 'react'
// import {  Button,Modal,ModalBody,ModalHeader,} from 'reactstrap'


class Modal extends React.Component {

	constructor(props) {
		super(props);

		this.outerStyle = {
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			overflow: "auto",
			zIndex: 1
		};

		// default style
		this.style = {
			modal: {
				position: "absolute",
				width: 350,
				padding: 35,
				left: 500,
				top:100,
				boxSizing: "border-box",
				backgroundColor: "#fff",
				borderRadius: 3,
				zIndex: 10,
				textAlign: "left",
				boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)"
				// ...this.props.style.modal
			},
			overlay: {
				position: "fixed",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(0,0,0,0.2)",
				// ...this.props.style.overlay
			}
		};
	}

	// render modal
	render() {
		return (
			<div
				style={{
					// ...this.outerStyle,
					display: this.props.isModalOpen ? "block" : "none"
				}}
			>
				<div className='modal-box' style={this.style.overlay} onClick={this.props.closeModal} />
				<div onClick={this.props.closeModal} />
				<div className='modal-box'>{this.props.children}</div>
			</div>
		);
	}
}

export default Modal
