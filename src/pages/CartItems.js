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
		<tr>
			<td>
				<div className={classes.image}>
					<img src={image} alt={name} />
				</div>
			</td>
			<td>
				<div className={classes.title}>
					<h4>
						{name}
						<span>{category}</span>
					</h4>			
				</div>
			</td>
			<td>
				<div className={classes.price}>
					<span>${price}</span>
				</div>
			</td>
			<td>
				<div className={classes.quantity}>
					<button onClick={removeItem}>-</button>
					{quantity}
					<button onClick={addItem}>+</button>
				</div>
			</td>
			<td>
				<div className={classes.price}>
					<p className={classes.total__price}>						
						${(Math.round(totalPrice * 100) / 100).toFixed(2)}
					</p>
				</div>
			</td>
		</tr>
	);
}
