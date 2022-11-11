import React from "react";

export default function ModalContainer(props) {
	return (
		<div className="backdrop" onClick={props.hideModal}></div>
	);
}
