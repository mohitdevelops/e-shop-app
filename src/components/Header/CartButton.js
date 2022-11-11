import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import css from "./header.module.css";

const CartButton = () => {
	const productQuantity = useSelector(
		(state) => state.productItem.totalQuantity
	);
	return (
		<div className={css.cart_btn}>
			<MdShoppingCart />
			<div className={css.cart_badge}>{productQuantity}</div>
		</div>
	);
};

export default CartButton;
