import classes from './Navigation.module.css';
import { BiUserCircle } from 'react-icons/bi';
import { FaSpotify } from 'react-icons/fa';
import { useState } from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import ProfilePicSkeleton from '../UI/Skeletons/ProfilePicSkeleton/ProfilePicSkeleton';
import { Link } from 'react-router-dom';

const Navigation = props => {
    
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isBackdropOpen, setIsBackdropOpen] = useState(false);

    const openProfileMenu = (e) => {
        if(e.target.tagName === 'IMG' || e.target.tagName === 'path' || e.target.tagName === 'svg'){
            if(isProfileMenuOpen){
                setIsProfileMenuOpen(false);
                setIsBackdropOpen(false);
            } else {
                setIsProfileMenuOpen(true);
                setIsBackdropOpen(true);
            }
        }
    }

    const closeBackdrop = () => {
        setIsProfileMenuOpen(false);
        setIsBackdropOpen(false);
    }

    // let userName = props.username;
    // console.log(typeof userName);
    // if(userName.length > 10) {
    //     userName = userName.substring(0, 10) + '...';
    // }

    let navLinks = (
        <div className={classes.NavLinks}>
            <div className={classes.NavigationLink} onClick={props.login}>
                <div>Login</div>
                &nbsp;
                <FaSpotify style={{display: 'block', fontSize: '1.2rem'}}/>
            </div>
        </div>
    )
    if(props.authorized) {
        let profilePic = (
            <ProfilePicSkeleton />
        );
        if(!props.loading) {
            profilePic = (
                props.userProfilePicture
                ? <img src={props.userProfilePicture} alt="profile_picture"/>
                : <div onClick={openProfileMenu}><BiUserCircle fontSize="2rem" cursor="pointer"/></div>
            )
        }
        navLinks = (
            <div className={classes.NavLinks}>
                <div className={classes.ProfilePic} onClick={openProfileMenu}>
                    {profilePic}
                    <div className={[classes.ProfileMenu, isProfileMenuOpen ? classes.ProfileMenuOpen : null].join(' ')}>
                        <div className={classes.Username}>{props.username ? props.username : 'not found'}</div>
                        {/* <div className={classes.Profile}>Profile</div> */}
                        <Link className={classes.Profile} to="/profile"onClick={closeBackdrop}>Profile</Link>
                        <div className={classes.Logout} onClick={props.logout}>Logout</div>
                    </div>
                </div>
            </div>
        )
    }



    return (
        <nav className={classes.Navigation}>
            <Backdrop open={isBackdropOpen && props.backdropOpenAlt} clicked={closeBackdrop}/>
            <div className={classes.Logo}>
                Spotify <span className={classes.Plus}>PLUS</span>
            </div>
            {navLinks}
        </nav>
    )
}

export default Navigation;