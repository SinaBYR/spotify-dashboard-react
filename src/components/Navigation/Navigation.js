import classes from './Navigation.module.css';
// import { BsMusicNoteBeamed } from 'react-icons/bs';
import { FaSpotify } from 'react-icons/fa';

const Navigation = props => {
    return (
        <nav className={classes.Navigation}>
            <div className={classes.Logo}>
                {/* <BsMusicNoteBeamed /> */}
                Spotify <span className={classes.Plus}>PLUS</span>
            </div>
            <div className={classes.Login} onClick={props.login}>
                <div>Login</div>
                &nbsp;
                <FaSpotify style={{display: 'block', fontSize: '1.2rem'}}/>
            </div>
        </nav>
    )
}

export default Navigation;