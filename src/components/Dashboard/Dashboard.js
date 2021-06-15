import { useState, useEffect } from 'react';
import classes from './Dashboard.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import Categories from './Categories/Categories';
import SelectCategory from './SelectCategory/SelectCategory';
import Workspace from './Workspace/Workspace';
import Header from './Header/Header';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const Dashboard = props => {

    const [isSelectingCategory, setIsSelectingCategory] = useState(false);
    // loading for search
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        console.log('[Dashboard]: Loaded');
    });
    const history = useHistory();
    const openCategorySelectorHandler = () => {
        setIsSelectingCategory(!isSelectingCategory);
    }
    const closeBackdropHandler = () => {
        setIsSelectingCategory(false);
    }

    // SEARCH METHOD FOR SEARCH COMPONENT ( ABANDONED )

    // const fetchSearchedTermHandler = (e) => {
    //     // setLoading(true);
    //     e.preventDefault();
    //     console.log(e.target.searchbar.value.trim());
    //     const query = e.target.searchbar.value.trim()
    //     const url = 'https://api.spotify.com/v1/search?type=artist%2Calbum%2Cplaylist&q=' + query;
    //     const config = {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json",
    //         headers: {
    //             "Authorization": "Bearer " + props.accessToken
    //         }
    //     };
    //     axios.get(url, config)
    //         .then(res => {
    //             // setSearchData({
    //             // });
    //             setLoading(false);
    //             console.log(res.data);
    //             console.log('[Workspace]: New Releases Fetched');
    //             history.location.pathname = '/dashboard/search?q=' + query;
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setLoading(false);
    //         });
    // }

    return (
        <div className={classes.Dashboard}>
            <div className={classes.Menu}>
                <Header />
                <SelectCategory openCategorySelector={openCategorySelectorHandler}/>
                <div className={classes.CategoryWrapper}>
                    <Categories />
                </div>
            </div>
            <Workspace accessToken={props.accessToken} profile={props.profile}/>
            
            <Backdrop open={isSelectingCategory} clicked={closeBackdropHandler}/>
            <Modal open={isSelectingCategory} clicked={closeBackdropHandler}>
                <Categories />
            </Modal>
        </div>
    )
}

export default Dashboard;