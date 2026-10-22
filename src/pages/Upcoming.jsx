import { useState } from 'react';
import TopNav from '../components/layout/TopNav';
import TaskCard from '../components/tasks/TaskCard';
import TaskModal from '../components/tasks/TaskModal';
import EmptyState from '../components/ui/EmptyState';
import { useTasks } from '../context/TaskContext';
import { groupByDate, formatDate } from '../utils/helpers';
import { CalendarClock } from 'lucide-react';

export default function Upcoming() {
  const { filterAndSortTasks } = useTasks();
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const upcomingTasks = filterAndSortTasks({ upcoming: true, sort: 'dueDate-asc' });
  const grouped = groupByDate(upcomingTasks);

  const handleEdit = (task) => { setEditTask(task); setShowModal(true); };
  const handleCloseModal = () => { setEditTask(null); setShowModal(false); };

  return (
    <div>
      <TopNav />
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
        {grouped.length === 0 ? (
          <EmptyState
            icon={CalendarClock}
            title="No upcoming tasks"
            description="Tasks with future due dates will appear here."
            actionLabel="Create Task"
            onAction={() => setShowModal(true)}
          />
        ) : (
          grouped.map((group) => (
            <div key={group.date}>
              <h3 className="text-sm font-semibold mb-3 px-1" style={{ color: 'var(--text-secondary)' }}>
                {group.label}
              </h3>
              <div className="space-y-2">
                {group.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} onEdit={handleEdit} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <TaskModal isOpen={showModal} onClose={handleCloseModal} editTask={editTask} />
    </div>
  );
}