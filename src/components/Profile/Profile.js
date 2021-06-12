import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileSkeleton from "../UI/Skeletons/ProfileSkeleton/ProfileSkeleton";
import classes from "./Profile.module.css";
// import axios from 'axios';

const Profile = props => {
    console.log('[Profile]: Loaded');
    const [profile, setProflie] = useState(null);
    const [loading, setLoading] = useState(false);
    // Performance Problem (solved)
    useEffect(() => {
        new Promise(()=>{
            setProflie(props.profile);
        })
        .catch(err => {})
    })

    // useEffect(() => {
    //     const url = 'https://api.spotify.com/v1/me';
    //     const config = {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json",
    //         headers: {
    //             "Authorization": "Bearer " + accessToken
    //         }
    //     };
    //     axios.get(url, config)
    //     .then(res => {
    //         console.log(res.data);
    //         setUsername(res.data.display_name);
    //         setProfilePic(res.data.images[0].url);
    //         setProfile(res.data);
    //         setLoading(false);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         setLoading(false);
    //     })
    // })
    let profilePanel = (
        <ProfileSkeleton />
    )
    if(profile){
        profilePanel = (
            <div className={classes.Panel}>
                <div className={classes.Content}>
                    <div className={classes.Head}>
                        <div className={classes.Image}>
                            <img src={profile.images[0] ? profile.images[0].url : ''} alt="profile"/>
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
                <Link className={classes.Link} to="/dashboard/liked">Back to Dashboard</Link>
            </div>
        )
    }
    return (
        <div className={classes.Profile}>
            <h2 className={classes.Heading}>Profile</h2>
            {profilePanel}
        </div>
    )
}

export default Profile;