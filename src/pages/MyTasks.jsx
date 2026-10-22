import { useState } from 'react';
import TopNav from '../components/layout/TopNav';
import TaskList from '../components/tasks/TaskList';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskModal from '../components/tasks/TaskModal';
import { useTasks } from '../context/TaskContext';
import { ClipboardList, Sparkles } from 'lucide-react';

export default function MyTasks() {
  const { filterAndSortTasks } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ status: '', priority: '', category: '', sort: 'createdAt-desc' });
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredTasks = filterAndSortTasks({ ...filters, search: searchQuery });

  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditTask(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen">
      <TopNav searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6 animate-entrance">
        {/* Header Stats Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Task Inventory
            </h2>
            <p className="text-xs sm:text-sm font-medium mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
              Showing {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} tailored to your filter criteria
            </p>
          </div>
        </div>

        <TaskFilters filters={filters} onChange={setFilters} />

        <TaskList
          tasks={filteredTasks}
          onEdit={handleEdit}
          emptyIcon={ClipboardList}
          emptyTitle="No tasks matched your view"
          emptyDesc="Try adjusting your search query, clearing active filters, or creating a fresh task."
          emptyActionLabel="Create Deliverable"
          onEmptyAction={() => setShowModal(true)}
        />
      </div>
      <TaskModal isOpen={showModal} onClose={handleCloseModal} editTask={editTask} />
    </div>
  );
}
