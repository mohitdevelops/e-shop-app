import React from "react";
// import { BsTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { productItemsActions } from "../store/product-items";
import classes from "./pages.module.css";

export default function CartItems(props) {
	const dispatch = useDispatch();
	const { name, image, category, price, totalPrice, id, quantity } = props.item;

	const removeItem = () => {
		// using the id of the item to be removed
		// Here Id parameter is our payload to the reducer
		dispatch(productItemsActions.removeProduct(id));
	};

	const addItem = () => {
		dispatch(
			// Same this object as argument is payload to add the given prop to show it to the CartItem list
			productItemsActions.addProduct({
				name,
				image,
				id,
				category,
				price,
				totalPrice,
			})
		);
	};

	return (
		<div className={classes.cartItem}>
			<div className={classes.right_box}>
				<img src={image} alt={name} />
				<button onClick={removeItem}>-</button>
				<button onClick={addItem}>+</button>
			</div>

			<div className={classes.info}>
				<div className={classes.top}>
					<h4>
						{name}
						<span>{category}</span>
					</h4>
				</div>

				<div className={classes.bottom}>
					{/* <button onClick={deleteProduct}>
						Remove <BsTrashFill />
					</button> */}
					<p className={classes.total__price}>
						<span>Quantity {quantity} X</span>&#8377;{totalPrice}
					</p>
				</div>
			</div>
		</div>
	);
}
