import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// O "export" precisa estar exatamente aqui, antes do "const useTaskStore"
export const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      
      addTask: (text) => set((state) => ({
        tasks: [...state.tasks, { id: crypto.randomUUID(), text, completed: false }]
      })),

      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })),
    }),
    {
      name: 'focus-tasks-storage',
    }
  )
);