import { useState } from 'react';
import TopNav from '../components/layout/TopNav';
import TaskList from '../components/tasks/TaskList';
import TaskModal from '../components/tasks/TaskModal';
import { useTasks } from '../context/TaskContext';
import { CheckCircle2 } from 'lucide-react';

export default function Completed() {
  const { filterAndSortTasks } = useTasks();
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const completedTasks = filterAndSortTasks({ status: 'completed', search: searchQuery, sort: 'createdAt-desc' });

  const handleEdit = (task) => { setEditTask(task); setShowModal(true); };
  const handleCloseModal = () => { setEditTask(null); setShowModal(false); };

  return (
    <div>
      <TopNav searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-4">
        <div>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            {completedTasks.length} completed task{completedTasks.length !== 1 ? 's' : ''}
          </p>
        </div>
        <TaskList
          tasks={completedTasks}
          onEdit={handleEdit}
          emptyIcon={CheckCircle2}
          emptyTitle="No completed tasks"
          emptyDesc="Complete some tasks and they'll appear here. You can restore them to pending."
        />
      </div>
      <TaskModal isOpen={showModal} onClose={handleCloseModal} editTask={editTask} />
    </div>
  );
}