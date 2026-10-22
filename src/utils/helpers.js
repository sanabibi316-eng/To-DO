export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (target.getTime() === today.getTime()) return 'Today';
  if (target.getTime() === tomorrow.getTime()) return 'Tomorrow';
  if (target.getTime() === yesterday.getTime()) return 'Yesterday';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
};

export const isOverdue = (dueDate, completed) => {
  if (!dueDate || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate + 'T00:00:00');
  return due < today;
};

export const isToday = (dateString) => {
  if (!dateString) return false;
  const today = new Date();
  const date = new Date(dateString + 'T00:00:00');
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isFuture = (dateString) => {
  if (!dateString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString + 'T00:00:00');
  return date > today;
};

export const getWeekDays = () => {
  const days = [];
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push({
      date: day.toISOString().split('T')[0],
      label: day.toLocaleDateString('en-US', { weekday: 'short' }),
      fullLabel: day.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      isToday: day.toDateString() === today.toDateString(),
    });
  }
  return days;
};

export const getPriorityValue = (priority) => {
  const map = { low: 1, medium: 2, high: 3 };
  return map[priority] || 0;
};

export const groupByDate = (tasks) => {
  const groups = {};
  tasks.forEach((task) => {
    const key = task.dueDate || 'No Due Date';
    if (!groups[key]) groups[key] = [];
    groups[key].push(task);
  });

  return Object.entries(groups)
    .sort(([a], [b]) => {
      if (a === 'No Due Date') return 1;
      if (b === 'No Due Date') return -1;
      return new Date(a) - new Date(b);
    })
    .map(([date, tasks]) => ({
      date,
      label: date === 'No Due Date' ? 'No Due Date' : formatDate(date),
      tasks,
    }));
};