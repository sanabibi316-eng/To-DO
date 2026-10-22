import { useState } from 'react';
import TopNav from '../components/layout/TopNav';
import TaskList from '../components/tasks/TaskList';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskModal from '../components/tasks/TaskModal';
import { useTasks } from '../context/TaskContext';
import { ClipboardList, CheckCircle2, Clock4, AlertCircle } from 'lucide-react';

export default function MyTasks() {
  const { filterAndSortTasks, stats } = useTasks();
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
      <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-5">
        {/* Header Summary Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Tasks</p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">{stats.total}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ClipboardList size={16} />
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending</p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">{stats.pending}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Clock4 size={16} />
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Completed</p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">{stats.completed}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Overdue</p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">{stats.overdue}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center">
              <AlertCircle size={16} />
            </div>
          </div>
        </div>

        {/* Filter controls */}
        <TaskFilters filters={filters} onChange={setFilters} />

        {/* Task list container */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Tasks ({filteredTasks.length})
            </h2>
          </div>

          <TaskList
            tasks={filteredTasks}
            onEdit={handleEdit}
            emptyIcon={ClipboardList}
            emptyTitle="No tasks matched your view"
            emptyDesc="Try adjusting your search query, clearing active filters, or creating a fresh task."
            emptyActionLabel="Create Task"
            onEmptyAction={() => setShowModal(true)}
          />
        </div>
      </div>

      <TaskModal isOpen={showModal} onClose={handleCloseModal} editTask={editTask} />
    </div>
  );
}
