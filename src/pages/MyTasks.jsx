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
    <div>
      <TopNav searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-4">
        <TaskFilters filters={filters} onChange={setFilters} />
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEdit}
          emptyIcon={ClipboardList}
          emptyTitle="No tasks yet"
          emptyDesc="Create your first task to get started with FocusFlow."
          emptyActionLabel="Create Task"
          onEmptyAction={() => setShowModal(true)}
        />
      </div>
      <TaskModal isOpen={showModal} onClose={handleCloseModal} editTask={editTask} />
    </div>
  );
}