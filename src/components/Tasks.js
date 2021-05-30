import Task from './Task'

const Tasks = ({tasks, deleteTask, toggleReminder}) => {

    return (
        <>
          {tasks.map ((task)=> (
              <Task toggleReminder={toggleReminder} deleteTask={deleteTask} key={task.id} task={task}/>
          ))}  
        </>
    )
}

export default Tasks
