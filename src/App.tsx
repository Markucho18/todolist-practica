import { useEffect, useReducer, useState } from "react"
import { TaskType, TasksReducerType } from "./types"
import Task from "./components/Task"
import { MdLibraryBooks } from "react-icons/md";

type FilterType = "All" | "Done" | "Todo"

const App: React.FC = () => {

  const initialTasks: TaskType[] = []

  const tasksReducer: TasksReducerType = (state, action) => {
    const {type, payload} = action
    switch(type){
      case "TOGGLE": {
        const newState = state.map((task)=>{
          return task.id === payload ? {...task, state: !task.state} : task
        })
        return newState
      }
      case "ADD": {
        const newTask = payload
        const newState = [...state, newTask]
        return newState
      }
      case "EDIT": {
        const newState = state.map((task)=>{
          const newName = payload.name
          return task.id === payload.id ? {...task, name: newName} : task
        })
        return newState
      }
      case "DELETE": {
        const newState = state.filter(task => task.id !== payload)
        return newState
      }
      case "DELETE_ALL_TASKS": {
        return []
      }
      case "DELETE_DONE_TASKS": {
        const newState = state.filter(task => task.state === false)
        return newState
      }
      default: return state
    }
  }

  const toggleTaskState = (taskId: string) => {
    dispatch({type: "TOGGLE", payload: taskId})
  }
  
  const addTask = (newTaskTitle: string) =>{
    const newTask = {
      id: crypto.randomUUID(),
      name: newTaskTitle,
      state: false
    }
    dispatch({type: "ADD", payload: newTask})
  }
  
  const editTask = (taskId: string, newTaskName: string) => {
    dispatch({type: "EDIT", payload: {id: taskId, name: newTaskName}})
  }
  
  const deleteTask = (taskId: string) => {
    dispatch({type: "DELETE", payload: taskId})
  }

  const deleteAllTasks = () => dispatch({type: "DELETE_ALL_TASKS"})

  const deleteDoneTasks = () => dispatch({type: "DELETE_DONE_TASKS"})
  
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

  const [filteredTasks, setFilteredTasks] = useState(tasks)

  const [filter, setFilter] = useState<FilterType>("All")

  const newFilteredTasks = {
    "All": tasks,
    "Done": tasks.filter(task => task.state === true),
    "Todo": tasks.filter(task => task.state === false)
  }

  useEffect(()=>{
    setFilteredTasks(newFilteredTasks[filter])
  },[filter, tasks])

  useEffect(()=>{
    console.log("FiteredTasks: ", filteredTasks)
  },[filteredTasks])

  const [taskInput, setTaskInput] = useState("")

  const handleTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTask(taskInput)
    setTaskInput("")
  }

  useEffect(()=>{
    console.log({tasks})
  },[tasks])

  return (
    <div className="flex flex-col gap-4 w-full px-4 lg:w-[1000px] lg:px-0 h-screen">
      <header className="flex flex-col w-full mt-2">
        <h1 className="text-4xl w-full text-center my-4">To-Do List</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full m-0 p-4 border-[2px] border-zinc-300 rounded-md gap-4"
        >
          <label className="flex items-stretch w-full border-[2px] border-zinc-300 focus-within:border-zinc-400 rounded-md overflow-hidden">
            <div className="flex items-center bg-blue-500 px-3">
              <MdLibraryBooks className="text-white text-2xl"/>
            </div>
            <input
              type="text"
              onChange={handleTaskInput}
              value={taskInput}
              placeholder="Task name"
              maxLength={50}
              className="flex flex-1 w-full p-3 text-xl focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-500 rounded-md text-white py-2 text-xl"
          >
            Add new task
          </button>
        </form>
      </header>
      <main className="flex flex-1 flex-col w-full gap-4 min-h-0">
        <h1 className="w-full text-center text-4xl">Tasks</h1>
        <div className="flex rounded-md overflow-hidden">
          <button
             className={`
              flex flex-1 justify-center py-2 bg-blue-400 text-lg text-white transition-all duration-100 ease-in-out
              ${filter === "All" && " bg-blue-500"}
             `}
             onClick={() => setFilter("All")}
           >
            All
          </button>
          <button
             className={`
              flex flex-1 justify-center py-2 bg-blue-400 text-lg text-white transition-all duration-100 ease-in-out
              ${filter === "Done" && " bg-blue-500"}
            `}
            onClick={() => setFilter("Done")}
           >
            Done
          </button>
          <button
            className={`
              flex flex-1 justify-center py-2 bg-blue-400 text-lg text-white transition-all duration-100 ease-in-out
              ${filter === "Todo" && " bg-blue-500"}
            `}
            onClick={() => setFilter("Todo")}
          >
            To do 
          </button>
        </div>
        <ul className="flex flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden">
          {filteredTasks.length > 0 ? filteredTasks.map((task, i)=>(
            <Task
              key={i}
              {...task}
              toggleTaskState={toggleTaskState}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          )) : (
            <p className="text-zinc-400 text-2xl">No tasks yet.</p>
          )}
        </ul>
      </main>
      <footer className="flex gap-4 w-full mb-4">
          <button 
            className="flex justify-center py-2 text-white text-xl flex-1 bg-red-500 hover:bg-red-600 rounded-md"
            onClick={deleteDoneTasks}
          >
            Delete Done Tasks
          </button>
          <button 
            className="flex justify-center py-2 text-white text-xl flex-1 bg-red-500 hover:bg-red-600 rounded-md"
            onClick={deleteAllTasks}
          >
            Delete All Tasks
          </button>
      </footer>
      
    </div>
  )
}

export default App