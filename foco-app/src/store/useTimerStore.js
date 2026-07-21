import { create } from 'zustand';

// Aqui estamos criando um "banco de dados" local na memória do app.
export const useTimerStore = create((set) => ({
  // Estado inicial: 25 minutos (em segundos) e parado.
  timeLeft: 25 * 60, 
  isRunning: false,
  
  // Ações: funções para alterar o estado acima
  startTimer: () => set({ isRunning: true }),
  pauseTimer: () => set({ isRunning: false }),
  resetTimer: () => set({ timeLeft: 25 * 60, isRunning: false }),
  
  // Esta é a função que será chamada para atualizar o tempo na tela
  updateTime: (newTime) => set({ timeLeft: newTime }),
}));