import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import ModalContainer from "./modal-container";
import classes from "./modal.module.css";
import { productItemsActions } from "../../store/product-items";

export default function ProductInfoModal(props) {
	const { name, image, category, price, id, description } = props.productData;
	console.log(props);

	const dispatch = useDispatch();
	
	const addToCartHandler = () => {
		dispatch(
			productItemsActions.addProduct({
				id,
				name,
				price,
				image,
				category,
			})
		);
	};
	return (
		<Fragment>
			<ModalContainer hideModal={props.modalHide} />
			<div className={classes.modal__container}>
				<div className={classes.modal__imageBox}>
					<img src={props.productData.image} alt="name here" />
				</div>
				<div className={classes.modal__contentBox}>
					<h3>{props.productData.name}</h3>
					<p>{props.productData.description}</p>
					<div className={classes.add_to_cart}>
						<p>${props.productData.price}</p>
						<button onClick={addToCartHandler}>Add to cart</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
