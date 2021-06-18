import classes from './Error.module.css';

const Error = props => {
    return (
        <div className={classes.Error}>
            <h2>{props.data.code ? props.data.code : ':('}</h2>
            <h2>{props.data.body ? props.data.body : 'An error has occured!'}</h2>
        </div>
    )
}

export default Error;