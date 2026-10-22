import { useState } from 'react';
import TopNav from '../components/layout/TopNav';
import TaskList from '../components/tasks/TaskList';
import TaskModal from '../components/tasks/TaskModal';
import { useTasks } from '../context/TaskContext';
import { CalendarDays } from 'lucide-react';

export default function Today() {
  const { filterAndSortTasks } = useTasks();
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const todayTasks = filterAndSortTasks({ todayOnly: true, sort: 'priority-desc' });

  const handleEdit = (task) => { setEditTask(task); setShowModal(true); };
  const handleCloseModal = () => { setEditTask(null); setShowModal(false); };

  return (
    <div>
      <TopNav />
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-4">
        <div>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            {todayTasks.length} task{todayTasks.length !== 1 ? 's' : ''} for today
          </p>
        </div>
        <TaskList
          tasks={todayTasks}
          onEdit={handleEdit}
          emptyIcon={CalendarDays}
          emptyTitle="Nothing due today"
          emptyDesc="You're all caught up! Create a task or enjoy your free time."
          emptyActionLabel="Add Task"
          onEmptyAction={() => setShowModal(true)}
        />
      </div>
      <TaskModal isOpen={showModal} onClose={handleCloseModal} editTask={editTask} />
    </div>
  );
}