import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import classes from "./App.module.css";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
import Redirecting from './components/Redirecting/Redirecting';
import Layout from './containers/Layout/Layout';


const App = props => {
    const [loggedIn, setloggedIn] = useState(false);
    // const [accessToken, setAccessToken] = useState('');
    // const [expirationDate, setExpirationDate] = useState('');
    const [app, setApp] = useState(<Route path="/" render={() => <Layout />}/>);

    const loginHandler = () => {

        const url = 'https://accounts.spotify.com/authorize?client_id=72f545293f9f4ac593711f8bd95d66c5&response_type=token&redirect_uri=http://localhost:3000/redirecting';

        const features = {
            width: 450,
            height: 730,
            left: (window.screen.width / 2) - (window.width / 2),
            top: (window.screen.height / 2) - (window.height / 2)
        }
        
        // window.open(url, 'Spotify Authorization' , 'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + features.width + ', height=' + features.height + ', top=' + features.top + ', left=' + features.left);

        window.location.href = url;

    }

    const checkLoggedIn = () => {
        setloggedIn(true);
        console.log('lol')
    }

    // useEffect(() => {
    //     const accessToken = localStorage.getItem('access_token');
    //     const expiresIn = localStorage.getItem('expires_in');

    //     console.log(new Date(expiresIn));

    //     if(accessToken && expiresIn && new Date() <= new Date(expiresIn)) {
    //         setAccessToken(localStorage.getItem('access_token'));
    //         setExpirationDate(localStorage.getItem('expires_in'));
    //     }

    //     console.log('useEffect [App.js]')
    // }, []);

    // useEffect(() => {
    //     if(accessToken && expirationDate) {
    //         setApp(<Redirect to="/dashboard"/>);
    //     }
    // }, [accessToken, expirationDate])

    // useEffect(() => {

    // }, [loggedIn])

    // useEffect(() => {
    //     if(props.isToken) {
    //         setApp(<Redirect to="/dashboard"/>);
    //     }
    // }, [app])

    // let app = (
    //     <Route path="/" component={Layout} />
    // )

    useEffect(() => {
        if(props.isToken) {
            setApp(<Redirect to="/dashboard"/>);
            // app = (
            //     <Redirect to="/dashboard"/>
            // )
        }
    }, [props.isToken])

    useEffect(() => {
        if(loggedIn) {
            setApp(<Redirect to="/dashboard"/>);
        }
    }, [loggedIn])

    return (
        <div className={classes.App}>
            <Navigation login={loginHandler}/>
            <Switch>
                <Route path="/redirecting" render={() => <Redirecting check={() => checkLoggedIn()}/>} />
                {app}
            </Switch>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isToken: state.auth.accessToken !== null
    }
}

export default connect(mapStateToProps)(App);