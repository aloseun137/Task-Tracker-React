
const Button = ({text, color, onAdd}) => {
    return (
        <button onClick={onAdd} style={{backgroundColor: color}} className="btn">
            {text}
        </button>
    )
}

export default Button
