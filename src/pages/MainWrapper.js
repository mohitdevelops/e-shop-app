import React from 'react';
import classes from './pages.module.css';

export default function MainWrapper(props) {
	return <main className={classes.wrapper}>{props.children}</main>;
}
