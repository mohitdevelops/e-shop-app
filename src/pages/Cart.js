import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import classes from "./pages.module.css";

export default function Cart() {
	const productItems = useSelector((state) => state.productItem.items);
	const productTotalAmount = useSelector(
		(state) => state.productItem.totalAmount
	);
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

	const cartTable = (
		<table
			className={classes.cartTable}
			border="0"
			cellPadding="0"
			cellSpacing="0"
		>
			<thead>
				<tr>
					<th></th>
					<th>Product</th>
					<th align="center">Price</th>
					<th align="center">Quantity</th>
					<th align="center">Total</th>
				</tr>
			</thead>
			<tbody>{items}</tbody>
		</table>
	);

	return (
		<Fragment>
			<section className={classes.cartWrap}>
				<div className={classes.cartlist__wrap}>
					{isListEmpty ? (
						<h2 className={classes.cart__title}>Your cart is empty</h2>
					) : (
						cartTable
					)}
				</div>
				<div className={classes.checkout__box}>
					<span>
						Total :{" "}
						<strong>
							${(Math.round(productTotalAmount * 100) / 100).toFixed(2)}
						</strong>
					</span>
					<a>Proceed to Checkout</a>
				</div>
			</section>
		</Fragment>
	);
}
