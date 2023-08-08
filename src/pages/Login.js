import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./pages.module.css";
import LoginHeader from "./LoginHeader";
import {
	browserSessionPersistence,
	setPersistence,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

export default function Login() {
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const emailInput = useRef();
	const passwordInput = useRef();

	const loginAuthHandler = (e) => {
		e.preventDefault();
		const enteredEmailValue = emailInput.current.value;
		const enteredPasswordValue = passwordInput.current.value;

		setPersistence(auth, browserSessionPersistence)
			.then(() => {
				return signInWithEmailAndPassword(
					auth,
					enteredEmailValue,
					enteredPasswordValue
				)
					.then(async () => {
						navigate("/");
					})
					.catch((err) => {
						setError(err.message);
					});
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	return (
		<div className={classes.loginWrapper}>
			<LoginHeader />
			<form onSubmit={loginAuthHandler}>
				<div className={classes.form_group}>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" ref={emailInput} />
				</div>
				<div className={classes.form_group}>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" ref={passwordInput} />
				</div>
				<div className={classes.form_group}>
					<button type="submit">Login</button>
				</div>
				<div className={classes.error_message}>{error}</div>
			</form>
		</div>
	);
}
