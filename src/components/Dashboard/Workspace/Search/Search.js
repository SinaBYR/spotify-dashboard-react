import { useEffect } from 'react';
import classes from './Search.module.css';

const Search = props => {

    useEffect(() => {
        // props.fetchData();
    })

    return (
        <div className={classes.Search}>
            <h4>Back</h4>
            <h2>Albums</h2>

            <h2>Playlists</h2>
            <h2>Artists</h2>
        </div>
    )
}

export default Search;