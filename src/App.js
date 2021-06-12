import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import classes from "./App.module.css";
import Dashboard from './components/Dashboard/Dashboard';
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
import Redirecting from './components/Redirecting/Redirecting';
import Landing from './components/Landing/Landing';
import axios from 'axios';
import Profile from './components/Profile/Profile';


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
            'user-follow-read'
        ];
        const encodedScopes = encodeURIComponent(scopes.join(' '));
        console.log(encodedScopes);
        const url = `https://accounts.spotify.com/authorize?client_id=72f545293f9f4ac593711f8bd95d66c5&response_type=token&redirect_uri=http://192.168.1.2:3000/redirecting&scope=${encodedScopes}`;

        window.location.href = url;
    }

    const logoutHandler = () => {
        setBackdropOpenAlt(false);
        setIsLoggedIn(false);
        // setUserAvatar(null);
        // localStorage.removeItem('access_token');
        // localStorage.removeItem('expires_in');
        window.history.go(0);
        localStorage.clear();
        setUsername(null);
    }


    useEffect(() => {
        console.log(profile);
        
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

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const url = 'https://api.spotify.com/v1/me';
        const config = {
            cancelToken: source.token,
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
            // return source.cancel('[App]: Fetching Canceled');
    }, []);

    let routes = (
            <Switch>
                <Route path="/" render={() => <Landing login={loginHandler}/>}/>
                {/* <Redirect to="/"/> */}
                <Route render={() => <Landing login={loginHandler}/>}/>
            </Switch>
    )
    if(isLoggedIn) {
        routes = (
                <Switch>
                    <Route path="/profile" render={() => <Profile profile={profile}/>}/>
                    <Route path="/dashboard/:id" render={() => <Dashboard accessToken={accessToken}/>}/>
                    {/* <Route render={() => <Dashboard accessToken={accessToken}/>}/> */}
                    {/* <Redirect to="/dashboard/liked-songs"/> */}
                    {/* <Route render={() => <Dashboard accessToken={accessToken}/>}/> */}
                    <Route render={() => <h1>SORRY COULDN'T FIND THAT PAGE 404 LOL</h1>}/>

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
                // userProfilePicture={accessToken && profile.images?[0].url : ''}
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