import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { productItemsActions } from "../../store/product-items";
import ProductInfoModal from "../Modal/ProductInfoModal";
import classes from "./product.module.css";

const ProductItem = (props) => {
	const { name, image, category, price, id } = props;
	const [isProductVisible, setIsProductVisible] = useState(false);
	const dispatch = useDispatch();

	const hideModalHandler = () => {
		setIsProductVisible(false);
	};

	const productDetailsModal = ReactDOM.createPortal(
		<ProductInfoModal modalHide={hideModalHandler} />,
		document.getElementById("modal")
	);

	const addToCartHandler = () => {
		dispatch(
			productItemsActions.addProduct({
				id,
				name,
				price,
				image,
				category
			})
		);
	};

	return (
		<Fragment>
			{isProductVisible && productDetailsModal}
			<div className={classes.product_item}>
				<div className={classes.product_image}>
					<img
						src={image}
						alt={name}
						onClick={() => setIsProductVisible(true)}
					/>
					<h3>{name}</h3>
					<p>{category}</p>
					<div className={classes.bottom}>
						<h4>${price}</h4>
						<button onClick={addToCartHandler}>Add to cart</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ProductItem;
