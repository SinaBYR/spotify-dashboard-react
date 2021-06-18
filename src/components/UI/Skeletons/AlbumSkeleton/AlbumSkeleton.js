import classes from './AlbumSkeleton.module.css';

const AlbumSkeleton = () => {
    return (
        <div className={classes.AlbumSkeleton}>
            <div className={classes.Cover}></div>
            <div className={classes.Title}></div>
            <div className={classes.Artist}></div>
        </div>
    )
}

export default AlbumSkeleton;