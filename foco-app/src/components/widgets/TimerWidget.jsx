import { useEffect, useRef } from 'react';
import { useTimerStore } from '../../store/useTimerStore';

export default function TimerWidget() {
  // Puxamos as variáveis e funções do nosso "cérebro" (Zustand)
  const { timeLeft, isRunning, startTimer, pauseTimer, resetTimer, updateTime } = useTimerStore();
  
  // O useRef é como uma variável que não recarrega a tela quando muda.
  // Vamos usar para guardar a que horas exatas o timer começou e quando ele deve acabar.
  const expectedEndTime = useRef(null);

  // O useEffect fica "vigiando" a variável isRunning. 
  // Toda vez que você der play ou pause, ele roda esse bloco.
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      // Quando dá play, calculamos a hora exata no futuro em que o timer deve zerar
      // Date.now() pega a hora exata do computador em milissegundos.
      expectedEndTime.current = Date.now() + (timeLeft * 1000);

      intervalId = setInterval(() => {
        const now = Date.now();
        // Descobrimos quantos segundos faltam comparando a hora atual com a hora de término
        const differenceInSeconds = Math.round((expectedEndTime.current - now) / 1000);

        if (differenceInSeconds <= 0) {
          // O tempo acabou!
          updateTime(0);
          pauseTimer();
          // Aqui no futuro podemos colocar um som de alarme: new Audio('/alarme.mp3').play()
        } else {
          // Atualiza a tela com o tempo exato, ignorando travamentos do navegador
          updateTime(differenceInSeconds);
        }
      }, 1000); // Roda a cada 1 segundo
    }

    // Função de limpeza: se o usuário pausar ou fechar o widget, paramos o intervalo
    return () => clearInterval(intervalId);
  }, [isRunning, updateTime, pauseTimer]); // Essas dependências dizem ao React quando refazer esse efeito

  // Formatar o tempo para aparecer bonito (ex: 25:00)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // O que vai aparecer na tela:
  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <h2 className="text-xl font-semibold mb-2">Foco</h2>
      
      {/* Mostrador do Relógio */}
      <div className="text-6xl font-bold font-mono mb-6">
        {formatTime(timeLeft)}
      </div>

      {/* Botões de Controle */}
      <div className="flex gap-4">
        {!isRunning ? (
          <button 
            onClick={startTimer}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Iniciar
          </button>
        ) : (
          <button 
            onClick={pauseTimer}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Pausar
          </button>
        )}
        <button 
          onClick={resetTimer}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}