import { useState, useEffect } from 'react';
import classes from './Dashboard.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import Categories from './SidebarMenu/Categories/Categories';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import Workspace from './Workspace/Workspace';

const Dashboard = ({ match }) => {

    const [isSelectingCategory, setIsSelectingCategory] = useState(false);

    useEffect(() => {
        // console.log(match);
    });

    const openCategorySelector = () => {
        setIsSelectingCategory(!isSelectingCategory);
    }
    const closeBackdrop = () => {
        setIsSelectingCategory(false);
    }

    return (
        <div className={classes.Dashboard}>
            <SidebarMenu openCategorySelector={openCategorySelector}/>
            
            <Workspace />

            <Backdrop open={isSelectingCategory} clicked={closeBackdrop}/>
            <Modal open={isSelectingCategory} clicked={closeBackdrop}>
                <Categories />
            </Modal>
        </div>
    )
}

export default Dashboard;