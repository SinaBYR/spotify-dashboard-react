import classes from "./App.module.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Navigation from "./components/Navigation/Navigation";
import Redirecting from './components/Redirecting/Redirecting';
import Landing from './components/Landing/Landing';
import Profile from './components/Profile/Profile';
import PageNotFound from './components/Errors/NotFound/PageNotFound';


const App = () => {
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
        const url = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=https://sinabyr-spotify-dashboard.onrender.com/redirecting&scope=${encodedScopes}`;

        // https://sinabyr-spotify-dashboard.onrender.com/redirecting
        // http://localhost:3000/redirecting
        window.location.href = url;
    }

    const logoutHandler = () => {
        setBackdropOpenAlt(false);
        setIsLoggedIn(false);
        setUserAvatar(null);
        window.location.href = 'https://sinabyr-spotify-dashboard.onrender.com';
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
                    <Route path="/">
                        <Redirect to="/dashboard/liked"/>
                    </Route>
                    <Route path="*" render={() => <PageNotFound isAuthorized={isLoggedIn}/>}/>
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
        </div>
    )
}


export default App;