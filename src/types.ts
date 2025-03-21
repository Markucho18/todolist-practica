export interface TaskType {
  id: string
  name: string
  state: boolean
}

export interface TaskMethods {
  toggleTaskState: (taskId: string) => void
  editTask: (taskId: string, newTaskName: string) => void
  deleteTask: (taskId: string) => void
}

interface ToggleAction {
  type: "TOGGLE";
  payload: string; // Solo el ID
}

interface AddAction {
  type: "ADD";
  payload: TaskType;
}

interface EditAction {
  type: "EDIT";
  payload: { id: string; name: string };
}

interface DeleteAction {
  type: "DELETE";
  payload: string; // Solo el ID
}

export type TaskAction = ToggleAction | AddAction | EditAction | DeleteAction;

export type TasksReducerType = (state: TaskType[], action: TaskAction) => TaskType[]