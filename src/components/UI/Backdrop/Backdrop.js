import classes from './Backdrop.module.css';

const Backdrop = props => {
    
    const classNames = [classes.Backdrop, props.open ? classes.Open : null];

    return (
        <div className={classNames.join(' ')} onClick={props.clicked}></div>
    )
}

export default Backdrop;