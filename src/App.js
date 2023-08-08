import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductMainWrapper from "./components/Products/ProductsMainWrapper";
import Login from "./pages/Login";
import MainWrapper from "./pages/MainWrapper";
import SignUp from "./pages/SignUp";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { auth } from "./firebase";
import Footer from "./pages/Footer";

function App() {
	const [profileUser, setProfileUser] = useState();
	// User Setup all over the app that user is loggedin
	const [userName, setUserName] = useState();

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUserName(user.displayName);
				setProfileUser(user);
			} else {
				setUserName(null);
			}
		});
	}, [userName, profileUser]);

	return (
		<div>
			<Header loggedUser={profileUser} />
			<MainWrapper>
				<Routes>
					<Route path="/" element={<ProductMainWrapper />} exact />
					<Route path="/cart" element={<Cart />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route
						path="/profile"
						element={
							!profileUser ? (
								<Navigate to="/login" replace />
							) : (
								<Profile loggedUser={profileUser} />
							)
						}
					/>
				</Routes>
			</MainWrapper>
			<Footer />
		</div>
	);
}

export default App;
