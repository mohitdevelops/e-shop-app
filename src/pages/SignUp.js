import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import LoginHeader from "./LoginHeader";
import classes from "./pages.module.css";

export default function SignUp() {
	const nameInput = useRef();
	const emailInput = useRef();
	const passwordInput = useRef();
	const navigate = useNavigate();
	const [error, setError] = useState(false);

	const signUpAuthHandler = (e) => {
		e.preventDefault();
		const enteredName = nameInput.current.value;
		const enteredEmail = emailInput.current.value;
		const enteredPassword = passwordInput.current.value;

		createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
			.then(async (res) => {
				updateProfile(res.user, {
					displayName: enteredName,
				});
				navigate("/");
			})
			.catch((err) => {
				setError(err.message);				
			});
	};

	return (
		<div className={classes.loginWrapper}>
			<LoginHeader />
			<form onSubmit={signUpAuthHandler}>
				<div className={classes.form_group}>
					<label htmlFor="name">Enter your name</label>
					<input type="text" id="name" ref={nameInput} />
				</div>
				<div className={classes.form_group}>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" ref={emailInput} />
				</div>
				<div className={classes.form_group}>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" ref={passwordInput} />
				</div>
				<div className={classes.form_group}>
					<button type="submit">Signup</button>
				</div>
				<div className={classes.error_message}>
					{error}
				</div>
			</form>
		</div>
	);
}
