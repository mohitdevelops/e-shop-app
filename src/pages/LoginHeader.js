import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./pages.module.css";

export default function SigningIn() {

	return (
		<div className={classes.loginHeader}>
			<ul>
				<li>
					<NavLink
						className={(navData) => (navData.isActive ? classes.active : "")}
						to="/login"
					>
						Login
					</NavLink>
				</li>
				<li>
					<NavLink
						className={(navData) => (navData.isActive ? classes.active : "")}
						to="/signup"
					>
						SignUp
					</NavLink>
				</li>
			</ul>
		</div>
	);
}
