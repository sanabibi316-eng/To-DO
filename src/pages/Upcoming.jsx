import { useState } from 'react';
import TopNav from '../components/layout/TopNav';
import TaskCard from '../components/tasks/TaskCard';
import TaskModal from '../components/tasks/TaskModal';
import EmptyState from '../components/ui/EmptyState';
import { useTasks } from '../context/TaskContext';
import { groupByDate } from '../utils/helpers';
import { CalendarClock, Calendar } from 'lucide-react';

export default function Upcoming() {
  const { filterAndSortTasks } = useTasks();
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const upcomingTasks = filterAndSortTasks({ upcoming: true, sort: 'dueDate-asc' });
  const grouped = groupByDate(upcomingTasks);

  const handleEdit = (task) => { setEditTask(task); setShowModal(true); };
  const handleCloseModal = () => { setEditTask(null); setShowModal(false); };

  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6 animate-entrance">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Upcoming Deadlines & Schedule
          </h2>
          <p className="text-xs sm:text-sm font-medium mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            Structured timeline of your future deliverables
          </p>
        </div>

        {grouped.length === 0 ? (
          <EmptyState
            icon={CalendarClock}
            title="Horizon is clear"
            description="No upcoming scheduled tasks found. Assign future due dates to see them ordered in this timeline."
            actionLabel="Plan New Task"
            onAction={() => setShowModal(true)}
          />
        ) : (
          grouped.map((group) => (
            <div key={group.date} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Calendar size={14} className="text-indigo-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  {group.label}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-500/10" style={{ color: 'var(--text-tertiary)' }}>
                  {group.tasks.length}
                </span>
              </div>
              <div className="space-y-3">
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
