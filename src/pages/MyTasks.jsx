import { useState } from 'react';
import TopNav from '../components/layout/TopNav';
import TaskList from '../components/tasks/TaskList';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskModal from '../components/tasks/TaskModal';
import { useTasks } from '../context/TaskContext';
import { ClipboardList } from 'lucide-react';

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
      <div className="px-6 sm:px-10 py-7 max-w-6xl space-y-6">
        {/* Title Heading: Task inventory (count) */}
        <div className="flex items-center gap-2.5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Task inventory
          </h2>
          <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center">
            {filteredTasks.length}
          </span>
        </div>

        {/* Filter controls pill row */}
        <TaskFilters filters={filters} onChange={setFilters} />

        {/* Task list container */}
        <div className="pt-1">
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEdit}
            emptyIcon={ClipboardList}
            emptyTitle="No tasks in inventory"
            emptyDesc="Create your first task or adjust your filters."
            emptyActionLabel="Create task"
            onEmptyAction={() => setShowModal(true)}
          />
        </div>
      </div>

      <TaskModal isOpen={showModal} onClose={handleCloseModal} editTask={editTask} />
    </div>
  );
}
