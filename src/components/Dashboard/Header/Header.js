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
    const pathname = history.location.pathname.slice(11);
    // motaghayyere end baraye component hayi ast ke /:id darand va fetch amigh va bishtari darand ta inke ba ezafe shodan neveshte be url hamchenan betavanim kalameye beyne dashboard va /:id ke Category ha hastan (mesle Playlists) ra estekhraj konim.
    let end = pathname.indexOf('/');
    if(end === -1) {
        end = 100;
    }
    const heading = headings[pathname.substring(0, end)];
    return(
        <div className={classes.Header}>
            {/* <h2 className={classes.Heading}>Dashboard</h2> */}
            <h2 className={classes.Heading}>{heading}</h2>
            <Searchbar />
        </div>
    )
}

export default Header;