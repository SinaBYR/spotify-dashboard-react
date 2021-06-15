import classes from './Song.module.css';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Song = props => {
    return (
        <div className={classes.Song} key={Math.random()}>
            <div className={classes.Cover}>
                <img src={props.cover} alt="cover"/>
            </div>
            <div className={classes.Info}>
                <div className={classes.Title}>{props.trackName}</div>
                <div className={classes.Artist}>{props.artists}</div>
            </div>
            {/* <div className={classes.Options}>
                <BsThreeDotsVertical />
            </div> */}
        </div>
    )
}

export default Song;