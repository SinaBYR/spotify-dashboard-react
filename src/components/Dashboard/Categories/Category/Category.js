import classes from "./Category.module.css"
import { Link } from "react-router-dom"

const Category = props => {
    return (
        <Link className={classes.Category} to={props.to}>{props.children}</Link>
    )
}

export default Category;