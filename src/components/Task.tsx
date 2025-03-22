import { TaskType, TaskMethods } from "../types"
import { FaCheck } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


type TaskProps = TaskType & TaskMethods 

const Task: React.FC<TaskProps> = ({id, name, state, toggleTaskState, editTask, deleteTask}) => {

  return (
    <li className="flex justify-between w-full py-4 px-5 text-xl border-[2px] border-zinc-300 rounded-md">
      <section className="flex gap-3 items-center">
        <div className="relative size-6 border-2 border-green-400 rounded-sm">
          <input
            type="checkbox"
            checked={state}
            onChange={() => toggleTaskState(id)}
            className="size-full z-10 absolute opacity-0"
          />
          {state && <FaCheck className="text-green-400"/> }
        </div>
        <p className={`${state ? "line-through text-red-500" : ""}`}>
          {name}
        </p>
      </section>
      <section className="flex gap-2">
        <button className="group">
          <FaEdit className="text-amber-400 group-hover:text-amber-600 size-6"/>
        </button>
        <button className="group" onClick={() => deleteTask(id)}>
          <MdDelete className="text-red-500 group-hover:text-red-700 size-6"/>
        </button>
      </section>
    </li>
  )
}

export default Task