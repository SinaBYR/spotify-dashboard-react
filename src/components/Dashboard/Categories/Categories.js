import classes from "./Categories.module.css";
import Category from "./Category/Category";

const Categories = props => {

    return (
        <div className={classes.Categories}>
            <Category to="/dashboard/liked">Liked Songs</Category>
            <Category to="/dashboard/recently">Recently Played</Category>
            <Category to="/dashboard/artists">Artists</Category>
            <Category to="/dashboard/albums">Albums</Category>
            <Category to="/dashboard/playlists">Playlists</Category>
            <Category to="/dashboard/new">New Releases</Category>
        </div>
    )
}

export default Categories;