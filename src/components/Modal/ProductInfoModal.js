import React, { Fragment } from "react";
import ModalContainer from "./modal-container";
import classes from "./modal.module.css";

export default function ProductInfoModal(props) {
	return (
		<Fragment>
            <ModalContainer hideModal={props.modalHide}/>
			<div className={classes.modal__container}>
				<div className={classes.modal__imageBox}>
					<img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="name here"/>
				</div>
				<div className={classes.modal__contentBox}>
					<h3>Title here</h3>
					<p>
						description here description here description here description here
						description here description here description here description here
						description here description here description here{" "}
					</p>
					<div className={classes.add_to_cart}>
						<p>$500.00</p>
						<button>Add to cart</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
