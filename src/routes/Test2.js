const Test2 = (props) => {
    console.log("check props >>>>", props)
    return (
        <div>
            I'm a parent
            <div>{props.children}</div>

        </div>
    )
}

export default Test2;