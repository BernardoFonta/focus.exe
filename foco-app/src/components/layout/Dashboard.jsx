import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useLayoutStore } from '../../store/useLayoutStore';
import TimerWidget from '../widgets/TimerWidget';

export default function Dashboard() {
  const { layout, setLayout } = useLayoutStore();

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Meu Focus Timer</h1>
      
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={1200}
        onLayoutChange={handleLayoutChange}
        isDraggable={true}
        isResizable={true}
      >
        {/* Usamos key="timer" para bater com o id definido no Zustand */}
        <div key="timer" className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700">
          <TimerWidget />
        </div>
      </GridLayout>
    </div>
  );
}
