import classes from './SidebarMenu.module.css';
import Searchbar from './Searchbar/Searchbar';

const SidebarMenu = props => {
    return (
        <aside className={classes.SidebarMenu}>
            <h2>Dashboard</h2>
            <Searchbar />
            <div className={classes.SelectCategory} onClick={props.openCategorySelector}>
                <div>Liked Songs</div>
            </div>
        </aside>
    )
}

export default SidebarMenu;