import LikedSongs from "./LikedSongs/LikedSongs"
import classes from "./Workspace.module.css"

const Workspace = props => {
    return (
        <div className={classes.Workspace}>
            <h2>Liked Songs</h2>
            <div className={classes.Content}>
                <LikedSongs />
            </div>
        </div>
    )
}

export default Workspace;