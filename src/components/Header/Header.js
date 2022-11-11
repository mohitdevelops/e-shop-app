import React, { Fragment, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import css from "./header.module.css";
import CartButton from "./CartButton";
import { Link } from "react-router-dom";

const Header = () => {
	const [loggedUser, setLoggedUser] = useState("");

	const auth = getAuth();
	const user = auth.currentUser;

	useEffect(() => {
		if (user) {
			setLoggedUser(user.displayName);					
		}
	}, [user]);


	return (
		<Fragment>
			<header>
				<div className={css.container}>
					<Link to="/" className={css.logo}>
						<h1>eShop</h1>
					</Link>
					<ul className={css.nav}>
						<li>
							<Link to="/cart">
								<CartButton />
							</Link>
						</li>
						<li>
							{user ? (
								<Link to="/profile">{loggedUser}</Link>
							) : (
								<Link to="/login">Login</Link>
							)}													
						</li>
					</ul>
				</div>
			</header>
		</Fragment>
	);
};

export default Header;


