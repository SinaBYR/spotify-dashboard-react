const Container = props => {
    return (
        <div style={{margin: props.margin, maxWidth: props.maxWidth, minWidth: props.minWidth, background: 'teal'}}>
            {props.children}
        </div>
    )
}

export default Container;