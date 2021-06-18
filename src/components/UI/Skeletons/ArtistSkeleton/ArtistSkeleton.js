import classes from './ArtistSkeleton.module.css';

const ArtistSkeleton = () => {
    return (
        <div className={classes.ArtistSkeleton}>
            <div className={classes.Avatar}></div>
            <div className={classes.Name}></div>
        </div>
    )
}

export default ArtistSkeleton;