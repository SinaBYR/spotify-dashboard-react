import classes from './SelectCategory.module.css';

const SelectCategory = props => {
    return (
        <div className={classes.SelectCategory} onClick={props.openCategorySelector}>
            <div>Select Category</div>
        </div>
    )
}

export default SelectCategory;