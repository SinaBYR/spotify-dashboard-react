import React from "react";
import classes from "./Layout.module.css";
import { BsFillPlayFill } from 'react-icons/bs';
// import Container from '../../components/UI/Container/Container';
import Button from "../../components/UI/Button/Button";


const Layout = () => {
    return (
        <React.Fragment>
            <section className={classes.Layout}>
                <BsFillPlayFill className={classes.PlayIcon}/>
                <div className={classes.Content}>
                    <h3>Observe. Create. Change.</h3>
                    <p>Organize your spotify playlists, favorite albums, liked songs and more.</p>
                    <Button>Start</Button>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Layout;