import TaskCard from './TaskCard';
import EmptyState from '../ui/EmptyState';
import { Search, ClipboardList, CheckCircle } from 'lucide-react';

export default function TaskList({ tasks, onEdit, emptyIcon, emptyTitle, emptyDesc, onEmptyAction, emptyActionLabel }) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon || ClipboardList}
        title={emptyTitle || 'No tasks found'}
        description={emptyDesc || 'Try adjusting your filters or create a new task.'}
        actionLabel={emptyActionLabel}
        onAction={onEmptyAction}
      />
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
}