import ReactDOM from "react-dom";
import { getAuth, signOut, updatePassword } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import classes from "./pages.module.css";
import PasswordResetDoneModal from "../components/Modal/PasswordResetDoneModal";

export default function Profile() {
	const navigate = useNavigate();
	const newPasswordValue = useRef();

	const [isPasswordResetted, setIsPasswordResetted] = useState(false);
	const [error, setError] = useState(false);
	const [loggedUser, setLoggedUser] = useState({
		name: "",
		email: "",
	});

	const auth = getAuth();
	const user = auth.currentUser;

	useEffect(() => {
		if (user !== null) {
			setLoggedUser({
				name: user.displayName,
				email: user.email,
			});
		}
	}, [user]);

	// Logout user function
	const signOutHandler = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				navigate("/");
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	// Password reset
	const passwordResetHandler = (e) => {
		e.preventDefault();
		const auth = getAuth();
		const user = auth.currentUser;
		const newPassword = newPasswordValue.current.value;
		if (newPassword === "" || !newPassword) {
			setError(true);
			return;
		}
		updatePassword(user, newPassword)
			.then(async () => {
				setIsPasswordResetted(true);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const passwordResetModal = ReactDOM.createPortal(
		<PasswordResetDoneModal />,
		document.getElementById("modal")
	);

	const errMsg = <div className={classes.errMsg}>Invalid input</div>;

	return (
		<div className={classes.profileWrapper}>
			{isPasswordResetted && passwordResetModal}
			<div className={classes.left__infoBox}>
				<h1>Account details</h1>
				<p>Username</p>
				<h2>{loggedUser.name}</h2>
				<p>Email Address</p>
				<h2>{loggedUser.email}</h2>
				<button className={classes.sign_out_btn} onClick={signOutHandler}>
					<FaPowerOff />
					Sign Out
				</button>
			</div>
			<div className={classes.right__passReset}>
				<h2>Reset Password</h2>
				<form onSubmit={passwordResetHandler}>
					<div className={classes.form_group}>
						<label htmlFor="password">New Password</label>
						<input
							type="text"
							name="newPassword"
							id="password"
							placeholder="Enter new password"
							ref={newPasswordValue}
							className={error ? `${classes.invalid}` : ``}
						/>
						{error ? errMsg : ""}
						<button type="submit">Reset</button>
					</div>
				</form>
			</div>
		</div>
	);
}
