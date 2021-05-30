import Button from '../components/Button'
import { useLocation } from 'react-router-dom'
const Header = ( {title, onAdd, showAddTask} ) => {
    const location = useLocation()
    return (
        <div className="header" >
            <header><h1>{title}</h1></header>
            {location.pathname === '/' && <Button onAdd={onAdd} color={showAddTask ? 'red' : 'green' } text={showAddTask ? 'Close' : 'Add'}/>}
        </div>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

export default Header
