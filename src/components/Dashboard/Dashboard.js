import { useState, useEffect } from 'react';
import classes from './Dashboard.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import Categories from './Categories/Categories';
import SelectCategory from './SelectCategory/SelectCategory';
import Workspace from './Workspace/Workspace';
import Header from './Header/Header';

const Dashboard = props => {

    const [isSelectingCategory, setIsSelectingCategory] = useState(false);

    useEffect(() => {
        console.log('[Dashboard]: Loaded');
    });

    const openCategorySelectorHandler = () => {
        setIsSelectingCategory(!isSelectingCategory);
    }
    const closeBackdropHandler = () => {
        setIsSelectingCategory(false);
    }

    return (
        <div className={classes.Dashboard}>
            <Header />
            <Workspace accessToken={props.accessToken} profile={props.profile}/>
            
            <SelectCategory openCategorySelector={openCategorySelectorHandler}/>
            <Backdrop open={isSelectingCategory} clicked={closeBackdropHandler}/>
            <Modal open={isSelectingCategory} clicked={closeBackdropHandler}>
                <Categories />
            </Modal>
        </div>
    )
}

export default Dashboard;