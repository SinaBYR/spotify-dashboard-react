import classes from "./Searchbar.module.css"

const Searchbar = props => {
    return (
        <form className={classes.Form}>
            <input className={classes.Searchbar} placeholder="Search for anything..." autoComplete="off" maxLength="30"/>
            <button className={classes.Button} type="submit">Search</button>
        </form>
    )
}

export default Searchbar;