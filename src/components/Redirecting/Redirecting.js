import { useEffect, useState } from "react";
// import { connect } from "react-redux";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./Redirecting.module.css";
// import * as actionTypes from '../../store/actions/actionTypes';
import { MdBlock, MdCheck, MdClear } from 'react-icons/md';
import { Redirect } from "react-router";

const Redirecting = props => {

    const [access, setAccess] = useState(false);
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {

        // const url = new URL(window.location.href);
        const hash = window.location.hash;
        // const accessToken = hash.substr(14, 135);
        const accessToken = hash.slice(14, hash.indexOf('&'));
        const expiresInHash = hash.substr(-4);
        const expiresInDate = new Date(new Date().getTime() + expiresInHash * 1000);
    
        if(hash){
            console.log(hash);
            console.log(accessToken);
            setAccess(true);
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('expires_in', expiresInDate);
        }
        setTimeout(() => {
            setRedirecting(true);
        }, 2800)
    }, [])
    let indicater = (
        <div className={classes.Indicater}>
            <MdClear fontSize="4rem" color="#041b2b" />
        </div>
    )
    if(access) {
        indicater = (
            <div className={classes.Indicater}>
                <MdCheck fontSize="4rem" color="#041b2b" />
            </div>
        )
    }
    return (
        <div className={classes.Redirecting}>
            <div className={classes.Content}>
                {/* <div>{access ? <div></div> : <MdBlock fontSize="4rem"/>}</div> */}
                {indicater}
                <h2>{access ? 'Access Granted' : 'Access Denied by User'}</h2>
                <Spinner />
                {redirecting && <Redirect to={access ? '/dashboard/liked' : '/'}/>}
            </div>
        </div>
    )
}

export default Redirecting;