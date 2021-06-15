import classes from "./Category.module.css"
import { NavLink } from "react-router-dom"

const Category = props => {
    return (
        <NavLink className={classes.Category} activeClassName={classes.Active} to={props.to}>{props.children}</NavLink>
    )
}

export default Category;