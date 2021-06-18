import classes from "./SongSkeleton.module.css";

const SongSkeleton = () => {
    return (
        <div className={classes.SongSkeleton}>
            <div className={classes.Cover}></div>
            <div className={classes.Info}>
                <div className={classes.Title}></div>
                <div className={classes.Artist}></div>
            </div>
        </div>
    )
}

export default SongSkeleton;