import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLayoutStore = create(
  persist(
    (set) => ({
      layout: [
        { i: 'timer', x: 0, y: 0, w: 4, h: 2 }, // i = id da div, x e y = posição, w e h = largura e altura
      ],
      setLayout: (newLayout) => set({ layout: newLayout }),
    }),
    {
      name: 'focus-timer-layout', 
    }
  )
);