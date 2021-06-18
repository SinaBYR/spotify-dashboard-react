import classes from './PageNotFound.module.css';
import { Link } from 'react-router-dom';

const PageNotFound = props => {

    const linkTo = props.isAuthorized ? '/dashboard/liked' : '/';
    return (
        <div className={classes.PageNotFound}>
            <div className={classes.Content}>
                <h2>404</h2>
                <p>Uh oh - Page not found</p>
                <ul className={classes.List}>
                    <li>The page you're looking for doesn't exist anymore.</li>
                    <li>You might have mistyped the URL.</li>
                    <li>The link you've got is broken.</li>
                </ul>
                <Link className={classes.Link} to={linkTo}>Home Page</Link>
            </div>
        </div>
    )
}

export default PageNotFound;