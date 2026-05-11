import { create } from 'zustand';
import { Task } from '../domains/tasks/types';

interface TaskStore {
  tasks: Record<string, Task>;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  getTasksArray: () => Task[];
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: {},
  addTask: (task) => set((state) => ({
    tasks: { ...state.tasks, [task.id]: task }
  })),
  updateTask: (id, updates) => set((state) => {
    if (!state.tasks[id]) return state;
    return {
      tasks: {
        ...state.tasks,
        [id]: { ...state.tasks[id], ...updates }
      }
    };
  }),
  getTasksArray: () => Object.values(get().tasks).sort((a, b) => b.createdAt - a.createdAt)
}));
