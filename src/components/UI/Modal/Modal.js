import classes from "./Modal.module.css";

const Modal = props => {

    let classNames = [classes.Modal, props.open ? classes.Open : null];

    return (
        <div className={classNames.join(' ')} onClick={props.clicked} style={props.style}>
            {props.children}
        </div>
    )
}

export default Modal;