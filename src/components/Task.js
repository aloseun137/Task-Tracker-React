import React from 'react'
import {FaTimes} from 'react-icons/fa'

const Task = ({task, deleteTask, toggleReminder}) => {
    return (
        <div onDoubleClick={()=> toggleReminder(task.id)} className= {`task ${task.reminder? "reminder": null}`}>
            <h3>{task.text} <FaTimes onClick={()=> deleteTask(task.id)} style={{color: 'red', cursor: 'pointer'}}/></h3>
            <h3>{task.day}</h3>
        </div>
    )
}

export default Task
