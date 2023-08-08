import { createSlice } from "@reduxjs/toolkit";


// Storing cart items to local storage 
const items =
	localStorage.getItem("cartList") !== null
		? JSON.parse(localStorage.getItem("cartList"))
		: [];
const totalAmount =
	localStorage.getItem("cartTotal") !== null
		? JSON.parse(localStorage.getItem("cartTotal"))
		: 0;
const totalQuantity =
	localStorage.getItem("cartQuantity") !== null
		? JSON.parse(localStorage.getItem("cartQuantity"))
		: 0;

// Repeatable code to store items to localStorage 
const setCartListFunc = (items, totalAmount, totalQuantity) => {
	localStorage.setItem("cartList", JSON.stringify(items));
	localStorage.setItem("cartTotal", JSON.stringify(totalAmount));
	localStorage.setItem("cartQuantity", JSON.stringify(totalQuantity));
};

const productItemsSlice = createSlice({
	name: "product",
	initialState: {
		items: items,
		totalQuantity: totalQuantity,
		totalAmount: totalAmount,
	},
	reducers: {
		// Here action is an object which we add while dispatching this reducer
		addProduct(state, action) {
			const newItem = action.payload;

			// Checking if the existing item is the same as the new item
			const existingItem = state.items.find((item) => item.id === newItem.id);

			// No matter if we have existing item or not totalQuantity will increase by 1
			state.totalQuantity++;

			// If the existing item does not exist we push a object to the initial item state
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.name,
					image: newItem.image,
					category: newItem.category,
				});
			} else {
				// If the existingItem does not exist then it will change the total price and quantity of the item use wants in his cart
				existingItem.quantity = existingItem.quantity + 1;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
			state.totalAmount = state.items.reduce(
				(total, items) => total + Number(items.price) * Number(items.quantity),
				0
			);
			// Setting cart Items to localStorage
			setCartListFunc(
				state.items.map((item) => item),
				state.totalAmount,
				state.totalQuantity
			);
		},

		// this action will also helps us to identify item that should be removed
		removeProduct(state, action) {
			// The id of the item to remove
			const removingItemId = action.payload;
			// find that item and remove from the array
			const existingItem = state.items.find(
				(item) => item.id === removingItemId
			);

			state.totalQuantity--;

			// if we have only 1 then we wanna remove it from the array
			if (existingItem.quantity === 1) {
				// we keep the items where the id don't match to the id we trying to remove
				state.items = state.items.filter((item) => item.id !== removingItemId);
			} else {
				// if we have more than 1 item we decrease the item by 1 on every click
				existingItem.quantity = existingItem.quantity - 1;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}

			state.totalAmount = state.items.reduce(
				(total, items) => total + Number(items.price) * Number(items.quantity),
				0
			);
			// Setting cart Items to localStorage
			setCartListFunc(
				state.items.map((item) => item),
				state.totalAmount,
				state.totalQuantity
			);
		},
	},
});

export const productItemsActions = productItemsSlice.actions;

export default productItemsSlice;
