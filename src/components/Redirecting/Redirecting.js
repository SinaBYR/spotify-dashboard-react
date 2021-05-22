import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./Redirecting.module.css";
import * as actionTypes from '../../store/actions/actionTypes';
import { Redirect } from "react-router";

const Redirecting = props => {

    const [access, setAccess] = useState(false);
    

    let redirect = (
        <Redirect to="/"/>
    )

    useEffect(() => {

        const url = new URL(window.location.href);
        const hash = window.location.hash;
        const accessToken = hash.substr(14, 135);
        const expiresInHash = hash.substr(-4);
        const expiresInDate = new Date(new Date().getTime() + expiresInHash * 1000);
    
        if(hash){
            setAccess(true);
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('expires_in', expiresInDate);

        }

    }, [])

    useEffect(() => {
        redirect = (
            <Redirect to="/dashboard"/>
        )
    }, [access])

    return (
        <div className={classes.Redirecting}>
            <div className={classes.Content}>
                <h2>{access ? 'You\'re successfully logged in.' : 'Access denied by user.'}</h2>
                <Spinner />
                {redirect}
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        login: (accessToken, expiresInDate) => dispatch({type: actionTypes.LOGIN, payload: {accessToken, expiresInDate}})
    }
}

export default connect(null, mapDispatchToProps)(Redirecting);