import classes from "./Profile.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileSkeleton from "../UI/Skeletons/ProfileSkeleton/ProfileSkeleton";
import { BiUserCircle, BiArrowBack } from 'react-icons/bi';
// import axios from 'axios';

const Profile = props => {
    console.log('[Profile]: Loaded');
    const [profile, setProflie] = useState(null);
    
    useEffect(() => {
        new Promise(()=>{
            setProflie(props.profile);
        })
        .catch(err => {})
    })

    let profilePanel = (
        <ProfileSkeleton />
    )
    if(profile){
        profilePanel = (
            <div className={classes.Panel}>
                <div className={classes.Content}>
                    <div className={classes.Head}>
                        <div className={classes.Image}>
                            {profile.images.length
                            ? <img src={profile.images[0].url} alt="profile"/>
                            : <div className={classes.AvatarPlaceholder}><BiUserCircle fontSize="10rem" cursor="pointer"/></div>}
                        </div>
                        <div className={classes.Username}>{profile.display_name}</div>
                    </div>
                    <div className={classes.Main}>
                        <div className={classes.Item}>
                            <p>Email</p>
                            <div>{profile.email}</div>
                        </div>
                        <div className={classes.Item}>
                            <p>Plan</p>
                            <div style={{textTransform: 'capitalize'}}>{profile.product}</div>
                        </div>
                        <div className={classes.Item}>
                            <p>Country</p>
                            <div>{profile.country}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={classes.Profile}>
            <Link className={classes.Link} style={{color: '#fa95ae', display: 'flex', justifyItems: 'center', alignItems: 'center'}} to="/dashboard/liked"><BiArrowBack fontSize="1.5rem"/>Dashboard</Link>
            <h2 className={classes.Heading}>Profile</h2>
            {profilePanel}
        </div>
    )
}

export default Profile;