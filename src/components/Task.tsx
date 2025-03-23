import { TaskType, TaskMethods } from "../types"
import { FaCheck } from "react-icons/fa6";
import { MdCheckCircleOutline } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";


type TaskProps = TaskType & TaskMethods 

const Task: React.FC<TaskProps> = ({id, name, state, toggleTaskState, editTask, deleteTask}) => {

  const [editing, setEditing] = useState(false)
  const [newNameInput, setNewNameInput] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewNameInput(e.target.value)

  return (
    <li className="flex gap-2 w-full py-4 px-5 text-xl border-[2px] border-zinc-300 rounded-md">
      <section className="flex flex-1 gap-3 items-center truncate">
        <div className="relative size-6 border-2 border-green-400 rounded-sm">
          <input
            type="checkbox"
            checked={state}
            onChange={() => toggleTaskState(id)}
            className="size-full z-10 absolute opacity-0"
          />
          <FaCheck className={`text-green-400 ${state ? "opacity-100" : "opacity-0"}`}/>
        </div>
        {editing ? (
          <input
            type="text"
            value={newNameInput}
            onChange={handleChange}
            placeholder="New name"
            maxLength={50}
            className="w-full focus:outline-none underline text-zinc-700"
          />
        ) : (
          <p className={`${state ? "line-through text-red-500" : ""}`}>
            {name}
          </p>
        )}
      </section>
      <section className="flex gap-2 items-center">
        {editing ? (
          <div className="flex gap-2 items-center">
            <button className="group" onClick={() => {
              editTask(id, newNameInput)
              setEditing(false)
              setNewNameInput("")
            }}>
              <MdCheckCircleOutline className="text-green-400 group-hover:text-green-500 size-7"/>
            </button>
            <button className="group" onClick={() => {
              setEditing(false)
              setNewNameInput("")
            }}>
              <ImCancelCircle className="text-red-400 group-hover:text-red-500 size-6"/>
            </button>
          </div>
        ) : (
          <button className="group" onClick={() => {
            setNewNameInput(name)
            setEditing(true)
          }}>
            <FaEdit className="text-amber-400 group-hover:text-amber-600 size-6"/>
          </button>
        )}
        <button className="group" onClick={() => deleteTask(id)}>
          <MdDelete className="text-red-500 group-hover:text-red-700 size-6"/>
        </button>
      </section>
    </li>
  )
}

export default Task