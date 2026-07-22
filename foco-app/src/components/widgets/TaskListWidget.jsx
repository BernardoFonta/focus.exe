import { useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { CheckCircle2, Circle, Trash2, Plus } from 'lucide-react';
import '../../index.css';
export default function TaskListWidget() {
  // Puxamos as funções e a lista do nosso estado global
  const { tasks, addTask, toggleTask, deleteTask } = useTaskStore();
  
  // Estado local apenas para o texto que está sendo digitado no input
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault(); // Evita que a página recarregue ao dar Enter
    if (newTaskText.trim() === '') return; // Não adiciona tarefa vazia
    
    addTask(newTaskText);
    setNewTaskText(''); // Limpa o input após adicionar
  };

  return (
    <div className="flex flex-col h-full text-white bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">Tarefas</h2>
      
      {/* Formulário para adicionar tarefa */}
      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="O que vamos focar agora?"
          className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition flex items-center justify-center"
        >
          <Plus size={20} />
        </button>
      </form>

      {/* Lista de Tarefas com scroll automático se ficar muito grande */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-4">Nenhuma tarefa pendente.</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg group">
              <button onClick={() => toggleTask(task.id)} className="text-gray-300 hover:text-white transition">
                {task.completed ? <CheckCircle2 className="text-green-500" size={20} /> : <Circle size={20} />}
              </button>
              
              <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.text}
              </span>
              
              {/* O botão de excluir só aparece quando passa o mouse por cima (group-hover) */}
              <button onClick={() => deleteTask(task.id)} className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}