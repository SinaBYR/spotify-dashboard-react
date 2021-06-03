import classes from "./LikedSongs.module.css";
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';

const LikedSongs = props => {
    return (
        <div className={classes.LikedSongs}>
            <div className={classes.Song}>
                <div className={classes.Icon}></div>
                <div className={classes.Info}>
                    <div className={classes.Title}>Time</div>
                    <div className={classes.Artist}>NEFFEX</div>
                </div>
                <div className={classes.Options}>
                    <BsThreeDotsVertical />
                </div>
            </div>
            <div className={classes.Song}>
                <div className={classes.Icon}></div>
                <div className={classes.Info}>
                    <div className={classes.Title}>Follow You</div>
                    <div className={classes.Artist}>Imagine Dragons</div>
                </div>
                <div className={classes.Options}>
                    <BsThreeDotsVertical />
                </div>
            </div>
            <div className={classes.Song}>
                <div className={classes.Icon}></div>
                <div className={classes.Info}>
                    <div className={classes.Title}>How Does It Feel</div>
                    <div className={classes.Artist}>London Grammar</div>
                </div>
                <div className={classes.Options}>
                    <BsThreeDotsVertical />
                </div>
            </div>
        </div>
    )
}

export default LikedSongs;