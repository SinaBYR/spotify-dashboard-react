import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import classes from "./App.module.css";
import Dashboard from './components/Dashboard/Dashboard';
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
import Redirecting from './components/Redirecting/Redirecting';
import Landing from './components/Landing/Landing';
import axios from 'axios';


const App = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [expirationDate, setExpirationDate] = useState(null);
    const [username, setUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [backdropOpenAlt, setBackdropOpenAlt] = useState(true);
    const [loading, setLoading] = useState(false);

    const loginHandler = () => {
        const url = 'https://accounts.spotify.com/authorize?client_id=72f545293f9f4ac593711f8bd95d66c5&response_type=token&redirect_uri=http://192.168.1.9:3000/redirecting';

        window.location.href = url;
    }

    const logoutHandler = () => {
        setBackdropOpenAlt(false);
        setIsLoggedIn(false);
        setProfilePic(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        setUsername(null);
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const expiresIn = localStorage.getItem('expires_in');

        if(accessToken && expiresIn && new Date() <= new Date(expiresIn)) {
            setIsLoggedIn(true);
            setAccessToken(accessToken);
            setExpirationDate(expiresIn);
        }

    }, [isLoggedIn]);

    useEffect(() => {
        setLoading(true);
        const url = 'https://api.spotify.com/v1/me';
        const config = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        };
        if(!accessToken){
            return false;
        }
        axios.get(url, config)
            .then(res => {
                console.log(res.data);
                setUsername(res.data.display_name);
                setProfilePic(res.data.images[0].url);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
            
    }, [isLoggedIn, isLoggedIn]);

    let routes = (
        <React.Fragment>
            <Route path="/" render={() => <Landing login={loginHandler}/>}/>
            <Redirect to="/"/>
        </React.Fragment>
    )
    if(isLoggedIn) {
        routes = (
            <React.Fragment>
                <Route path="/dashboard" render={() => <Dashboard accessToken={accessToken}/>}/>
                <Redirect to="/dashboard"/>
            </React.Fragment>
        )
    }

    return (
        <div className={classes.App}>
            <Navigation
                loading={loading}
                backdropOpenAlt={backdropOpenAlt}
                authorized={isLoggedIn}
                username={username}
                userProfilePicture={profilePic}
                login={loginHandler}
                logout={logoutHandler}
                />
            <Switch>
                <Route path="/redirecting" component={Redirecting}/>
                {routes}
            </Switch>
            <Footer />
        </div>
    )
}


export default App;