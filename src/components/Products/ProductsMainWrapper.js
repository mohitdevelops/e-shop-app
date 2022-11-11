import React from "react";
import { useState, useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./product.module.css";
import ProductItem from "./ProductItem";

const ProductMainWrapper = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currVisibleItem, setCurrVisibleItem] = useState(4);
	const [loadmoreBtn, setLoadmoreBtn] = useState(true);

	const loadMoreItemsHandler = () => {
		setCurrVisibleItem(currVisibleItem + 4);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			const response = await fetch(
				`https://fakestoreapi.com/products?limit=${currVisibleItem}`
			);
			if (!response.ok) throw new Error("Fetching failed");
			const responseData = await response.json();
			setIsLoading(false);
			const loadedProduct = [];
			for (const key in responseData) {
				loadedProduct.push({
					id: key,
					name: responseData[key].title,
					description: responseData[key].description,
					image: responseData[key].image,
					price: responseData[key].price,
					category: responseData[key].category,
				});
			}
			setProducts(loadedProduct);
			if (currVisibleItem > loadedProduct.length) {
				setLoadmoreBtn(false);
			}
		};
		fetchProducts();
	}, [currVisibleItem]);

	const itemList = products.map((item) => {
		return (
			<ProductItem
				key={item.id}
				id={item.id}
				name={item.name}
				description={item.description}
				image={item.image}
				price={item.price}
				category={item.category}
			/>
		);
	});
	

	return (
		<main>
			{isLoading && <LoadingSpinner />}
			<div className={classes.container}>{itemList}</div>
			<div className={classes.loadmore__wrap}>
				{loadmoreBtn && (
					<button className={classes.loadmore} onClick={loadMoreItemsHandler}>
						Load more
					</button>
				)}
			</div>
		</main>
	);
};

export default ProductMainWrapper;
