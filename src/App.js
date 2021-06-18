import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import classes from "./App.module.css";
import Dashboard from './components/Dashboard/Dashboard';
import Navigation from "./components/Navigation/Navigation";
import Redirecting from './components/Redirecting/Redirecting';
import Landing from './components/Landing/Landing';
import axios from 'axios';
import Profile from './components/Profile/Profile';
import PageNotFound from './components/Errors/NotFound/PageNotFound';


const App = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [expirationDate, setExpirationDate] = useState(null);
    const [profile, setProfile] = useState(null);
    const [username, setUsername] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);
    const [backdropOpenAlt, setBackdropOpenAlt] = useState(true);
    const [loading, setLoading] = useState(false);

    const loginHandler = () => {
        
        const scopes = [
            'user-read-private',
            'user-read-email',
            'user-library-modify',
            'user-library-read',
            'user-follow-modify',
            'user-follow-read',
            'user-read-recently-played'
        ];
        const encodedScopes = encodeURIComponent(scopes.join(' '));
        console.log(encodedScopes);
        const url = `https://accounts.spotify.com/authorize?client_id=72f545293f9f4ac593711f8bd95d66c5&response_type=token&redirect_uri=http://localhost:3000/redirecting&scope=${encodedScopes}`;

        window.location.href = url;
    }

    const logoutHandler = () => {
        setBackdropOpenAlt(false);
        setIsLoggedIn(false);
        setUserAvatar(null);
        window.location.href = 'http://localhost:3000';
        localStorage.clear();
        setUsername(null);
    }


    useEffect(() => {
        
        setLoading(true);
        
        const accessToken = localStorage.getItem('access_token');
        const expiresIn = localStorage.getItem('expires_in');
        
        if(new Date().getTime() > new Date(expiresIn).getTime()) {
            localStorage.clear();
        }

        if(accessToken && expiresIn && new Date().getTime() <= new Date(expiresIn).getTime()) {
            setIsLoggedIn(true);
            setAccessToken(accessToken);
            setExpirationDate(expiresIn);
        }
        if(!accessToken){
            return false;
        }

        const url = 'https://api.spotify.com/v1/me';
        const config = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        };
        axios.get(url, config)
            .then(res => {
                console.log(res.data);
                setUsername(res.data.display_name);
                if(res.data.images.length){
                    setUserAvatar(res.data.images[0].url);
                }
                setProfile(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
            console.log(profile);
    }, []);

    let routes = (
            <Switch>
                <Route path="/" render={() => <Landing login={loginHandler}/>}/>
            </Switch>
    )
    if(isLoggedIn) {
        routes = (
                <Switch>
                    <Route path="/profile" render={() => <Profile profile={profile}/>}/>
                    <Route path="/dashboard/:id" render={() => <Dashboard accessToken={accessToken}/>}/>
                    <Route path="/" render={() => <PageNotFound isAuthorized={isLoggedIn}/>}/>
                </Switch>
        )
    }
    
    return (
        <div className={classes.App}>
            <Navigation
                loading={loading}
                backdropOpenAlt={backdropOpenAlt}
                authorized={isLoggedIn}
                username={username}
                userProfilePicture={userAvatar}
                login={loginHandler}
                logout={logoutHandler}
                />
                <Route path="/redirecting" component={Redirecting}/>
                {routes}
            {/* <Footer /> */}
        </div>
    )
}


export default App;