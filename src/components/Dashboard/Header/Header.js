import classes from "./Header.module.css";
import Searchbar from "../../UI/Searchbar/Searchbar"
import { useHistory } from "react-router";

const headings = {
    'liked': 'Liked Songs',
    'albums': 'Albums',
    'artists': 'Artists',
    'playlists': 'Playlists',
    'new': 'New Releases',
    'recently': 'Recently Played',
}

const Header = () => {
    const history = useHistory();
    // console.log(history.location.pathname.substring(11));
    const heading = headings[history.location.pathname.substring(11)];
    return(
        <div className={classes.Header}>
            {/* <h2 className={classes.Heading}>Dashboard</h2> */}
            <h2 className={classes.Heading}>{heading}</h2>
            <Searchbar />
        </div>
    )
}

export default Header;