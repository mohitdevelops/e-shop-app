import React from 'react';
import classes from './spinner.module.css';

export default function LoadingSpinner(){
    return <div className={classes.loader}>
        <div className={classes.rotating}></div>
        <p>Loading...</p>
    </div>
}