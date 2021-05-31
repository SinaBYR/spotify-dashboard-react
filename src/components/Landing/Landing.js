import React from "react";
import classes from "./Landing.module.css";
import { BsFillPlayFill } from 'react-icons/bs';
import Button from "../UI/Button/Button";


const Landing = props => {
    return (
        <React.Fragment>
            <section className={classes.Landing}>
                <BsFillPlayFill className={classes.PlayIcon}/>
                <div className={classes.Content}>
                    <h3>Observe. Create. Change.</h3>
                    <p>Organize your spotify playlists, favorite albums, liked songs and more.</p>
                    <Button clicked={props.login}>Connect Spotify</Button>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Landing;