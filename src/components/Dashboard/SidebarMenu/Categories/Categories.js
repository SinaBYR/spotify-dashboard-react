import classes from "./Categories.module.css";
import Category from "./Category/Category";

const Categories = props => {

    return (
        <div className={classes.Categories}>
            <Category to="/dashboard/liked-songs">Liked Songs</Category>
            <Category to="/dashboard/recently-played">Recently Played</Category>
            <Category to="/dashboard/artists">Artists</Category>
            <Category to="/dashboard/albums">Albums</Category>
            <Category to="/dashboard/playlists">Playlists</Category>
            <Category to="/dashboard/recommended">Recommended</Category>
        </div>
    )
}

export default Categories;