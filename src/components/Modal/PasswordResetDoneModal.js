import React, { Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ModalContainer from "./modal-container";
import classes from "./modal.module.css";

export default function PasswordResetDoneModal(props) {
    const navigate = useNavigate();
    
	return (
		<Fragment>
			<ModalContainer hideModal={props.modalHide} />
			<div className={`${classes.modal__container} ${classes.modal_reset}`}>
                <div className={classes.pass_reset}>
                    <FaCheckCircle />
                    <h3>Password has been reset</h3>
                    <button onClick={() => navigate('/')}>Ok</button>
                </div>
            </div>
		</Fragment>
	);
}
