import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { productItemsActions } from "../../store/product-items";
import ProductInfoModal from "../Modal/ProductInfoModal";
import classes from "./product.module.css";

const ProductItem = (props) => {
	const { name, image, category, price, id, description } = props;
	const [isProductVisible, setIsProductVisible] = useState(false);
	const dispatch = useDispatch();
	const [productState, setProductState] = useState({ show: 0 });

	const hideModalHandler = () => {
		setIsProductVisible(false);
	};

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

	const productDetailsModal = ReactDOM.createPortal(
		<ProductInfoModal modalHide={hideModalHandler} productData={props} />,
		document.getElementById("modal")
	);

	const showProductModalHandler = () => {
		if (productState.show === props.id) {
			setIsProductVisible(true);
		} else {
			setIsProductVisible(false);
		}
		getProductModal(props.id);
	};

	const getProductModal = (value) => {
		setProductState({ show: value });
	};

	return (
		<Fragment>
			{isProductVisible && productDetailsModal}
			<div className={classes.product_item}>
				<div className={classes.product_image}>
					<img src={image} alt={name} onClick={showProductModalHandler} />
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
