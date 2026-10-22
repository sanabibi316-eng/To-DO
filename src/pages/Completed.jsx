import { useState } from 'react';
import TopNav from '../components/layout/TopNav';
import TaskList from '../components/tasks/TaskList';
import TaskModal from '../components/tasks/TaskModal';
import { useTasks } from '../context/TaskContext';
import { CheckCircle2, Award } from 'lucide-react';

export default function Completed() {
  const { filterAndSortTasks } = useTasks();
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const completedTasks = filterAndSortTasks({ status: 'completed', search: searchQuery, sort: 'createdAt-desc' });

  const handleEdit = (task) => { setEditTask(task); setShowModal(true); };
  const handleCloseModal = () => { setEditTask(null); setShowModal(false); };

  return (
    <div className="min-h-screen">
      <TopNav searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6 animate-entrance">
        {/* Completed Hero Bar */}
        <div
          className="rounded-3xl p-6 glass-panel border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md">
              <Award size={24} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Accomplishment Log
              </h2>
              <p className="text-xs sm:text-sm font-medium mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                {completedTasks.length} {completedTasks.length === 1 ? 'task' : 'tasks'} successfully executed and archived
              </p>
            </div>
          </div>
        </div>

        <TaskList
          tasks={completedTasks}
          onEdit={handleEdit}
          emptyIcon={CheckCircle2}
          emptyTitle="No completed deliverables yet"
          emptyDesc="As you tick off completed items from your tasks list, they will be archived here for your records."
        />
      </div>
      <TaskModal isOpen={showModal} onClose={handleCloseModal} editTask={editTask} />
    </div>
  );
}
