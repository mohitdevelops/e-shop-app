import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import classes from "./pages.module.css";

export default function Cart() {
	const productItems = useSelector((state) => state.productItem.items);
	const [isListEmpty, setIsListEmpty] = useState(false);

	const items = productItems.map((el) => {
		return (
			<CartItems
				key={el.id}
				item={{
					id: el.id,
					name: el.name,
					image: el.image,
					price: el.price,
					category: el.category,
					totalPrice: el.totalPrice,
					quantity: el.quantity,
				}}
			/>
		);
	});

	useEffect(() => {
		if (items.length === 0) {			
			setIsListEmpty(true);
		}
	}, [items]);

	return (
		<Fragment>
			<section className={classes.cartWrap}>
				<div className={classes.left__wrap}>
					{isListEmpty && <h2 className={classes.cart__title}>Your cart is empty</h2>}					
					{items}
				</div>
				<div className={classes.right__wrap}>
					Subtotal (2 Items) : <strong>&#8377; 2500</strong>
					{/* <a>Proceed to Checkout</a> */}
				</div>
			</section>
		</Fragment>
	);
}
