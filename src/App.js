import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import About from './components/About'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  const [tasks, setTasks] = useState ([])
useEffect(() => {
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }
  getTasks()
}, [])

const [showAddTask, setShowAddTask] = useState(false)
  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()

    setTasks([...tasks, data])
  }

    // Fetch Tasks
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
  
      return data
    }
    // Fetch Task
      const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
  
      return data
    }

    // Delete Task
    const deleteTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      })
      //We should control the response status to decide if we will change the state or not.
      res.status === 200
        ? setTasks(tasks.filter((task) => task.id !== id))
        : alert('Error Deleting This Task')
    }
  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }
  return (
    <Router>
    <div className="container">
      <Header showAddTask={showAddTask} onAdd={() => setShowAddTask(!showAddTask)}/>
      <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? <Tasks deleteTask={deleteTask} toggleReminder={toggleReminder} tasks={tasks}/>: 'No Task Available'}
            </>
          )}
        />
        <Route path='/about' component={About} />
      <Footer/>
    </div>
    </Router>

  );
}

export default App;
