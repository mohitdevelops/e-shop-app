import React, { Fragment, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";
import classes from "./header.module.css";
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
				<div className={classes.container}>
					<Link to="/" className={classes.logo}>
						<h1>eShop</h1>
					</Link>
					<ul className={classes.nav}>
						<li>
							<Link to="/cart">
								<CartButton />
							</Link>
						</li>
						<li>
							{user ? (
								<Link to="/profile" className={classes.mobile_user}>
									<span className={classes.user_name}>
										Welcome, {loggedUser}
									</span>
									<span className={classes.user_icon}>
										<FaUserCircle />
									</span>
								</Link>
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
