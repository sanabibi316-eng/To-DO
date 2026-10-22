import { useState } from 'react';
import TopNav from '../components/layout/TopNav';
import TaskList from '../components/tasks/TaskList';
import TaskModal from '../components/tasks/TaskModal';
import { useTasks } from '../context/TaskContext';
import { CalendarDays, Flame, CheckCircle2 } from 'lucide-react';

export default function Today() {
  const { filterAndSortTasks } = useTasks();
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const todayTasks = filterAndSortTasks({ todayOnly: true, sort: 'priority-desc' });
  const completedToday = todayTasks.filter((t) => t.completed).length;

  const handleEdit = (task) => { setEditTask(task); setShowModal(true); };
  const handleCloseModal = () => { setEditTask(null); setShowModal(false); };

  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6 animate-entrance">
        {/* Today Header Hero */}
        <div
          className="rounded-3xl p-6 glass-panel border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-md">
              <Flame size={24} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Target Objectives Today
              </h2>
              <p className="text-xs sm:text-sm font-medium mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                {todayTasks.length} total scheduled • {completedToday} done
              </p>
            </div>
          </div>

          {todayTasks.length > 0 && (
            <div className="badge-pill bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20 px-3.5 py-1.5 self-start sm:self-auto">
              <CheckCircle2 size={13} strokeWidth={2.5} />
              <span>{Math.round((completedToday / todayTasks.length) * 100)}% progress</span>
            </div>
          )}
        </div>

        <TaskList
          tasks={todayTasks}
          onEdit={handleEdit}
          emptyIcon={CalendarDays}
          emptyTitle="Nothing on the docket today"
          emptyDesc="You have zero deadlines scheduled for today. Enjoy the breather or add a high priority deliverable."
          emptyActionLabel="Schedule Task"
          onEmptyAction={() => setShowModal(true)}
        />
      </div>
      <TaskModal isOpen={showModal} onClose={handleCloseModal} editTask={editTask} />
    </div>
  );
}
