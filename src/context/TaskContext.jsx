import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';
import { generateId, isOverdue, isToday, isFuture, getWeekDays, getPriorityValue } from '../utils/helpers';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('focusflow-tasks', []);
  const [notifications, setNotifications] = useLocalStorage('focusflow-notifications', []);
  const { addToast } = useToast();

  const addNotification = useCallback((message, type = 'info') => {
    const notification = {
      id: generateId(),
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [notification, ...prev].slice(0, 20));
  }, [setNotifications]);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, [setNotifications]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, [setNotifications]);

  const addTask = useCallback((taskData) => {
    const task = {
      id: generateId(),
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      category: taskData.category || '',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || '',
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setTasks((prev) => [task, ...prev]);
    addToast('Task created successfully!', 'success');
    addNotification(`New task: "${task.title}"`, 'task');
    return task;
  }, [setTasks, addToast, addNotification]);

  const updateTask = useCallback((id, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              title: updates.title?.trim() || task.title,
              description: updates.description?.trim() ?? task.description,
            }
          : task
      )
    );
    addToast('Task updated successfully!', 'success');
  }, [setTasks, addToast]);

  const deleteTask = useCallback((id) => {
    const task = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    addToast('Task deleted', 'info');
    if (task) addNotification(`Deleted: "${task.title}"`, 'delete');
  }, [tasks, setTasks, addToast, addNotification]);

  const toggleComplete = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const completed = !task.completed;
        if (completed) {
          addToast('Task completed! 🎉', 'success');
          addNotification(`Completed: "${task.title}"`, 'complete');
        } else {
          addToast('Task restored to pending', 'info');
        }
        return {
          ...task,
          completed,
          completedAt: completed ? new Date().toISOString() : null,
        };
      })
    );
  }, [setTasks, addToast, addNotification]);

  const clearAllTasks = useCallback(() => {
    setTasks([]);
    addToast('All tasks cleared', 'info');
    addNotification('All tasks cleared', 'delete');
  }, [setTasks, addToast, addNotification]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = tasks.filter((t) => !t.completed).length;
    const overdue = tasks.filter((t) => isOverdue(t.dueDate, t.completed)).length;
    return { total, completed, pending, overdue };
  }, [tasks]);

  const weeklyData = useMemo(() => {
    const weekDays = getWeekDays();
    return weekDays.map((day) => {
      const count = tasks.filter(
        (t) =>
          t.completed &&
          t.completedAt &&
          new Date(t.completedAt).toISOString().split('T')[0] === day.date
      ).length;
      return { ...day, completed: count };
    });
  }, [tasks]);

  const filterAndSortTasks = useCallback(
    (filters = {}) => {
      let filtered = [...tasks];

      if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(
          (t) =>
            t.title.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query)
        );
      }
      if (filters.status === 'completed') {
        filtered = filtered.filter((t) => t.completed);
      } else if (filters.status === 'pending') {
        filtered = filtered.filter((t) => !t.completed);
      } else if (filters.status === 'overdue') {
        filtered = filtered.filter((t) => isOverdue(t.dueDate, t.completed));
      }
      if (filters.priority) {
        filtered = filtered.filter((t) => t.priority === filters.priority);
      }
      if (filters.category) {
        filtered = filtered.filter((t) => t.category === filters.category);
      }
      if (filters.todayOnly) {
        filtered = filtered.filter(
          (t) => isToday(t.dueDate) || isOverdue(t.dueDate, t.completed)
        );
      }
      if (filters.upcoming) {
        filtered = filtered.filter((t) => isFuture(t.dueDate) && !t.completed);
      }

      const sortKey = filters.sort || 'createdAt-desc';
      const [field, direction] = sortKey.split('-');
      filtered.sort((a, b) => {
        let comparison = 0;
        switch (field) {
          case 'createdAt':
            comparison = new Date(a.createdAt) - new Date(b.createdAt);
            break;
          case 'dueDate':
            if (!a.dueDate && !b.dueDate) comparison = 0;
            else if (!a.dueDate) comparison = 1;
            else if (!b.dueDate) comparison = -1;
            else comparison = new Date(a.dueDate) - new Date(b.dueDate);
            break;
          case 'priority':
            comparison = getPriorityValue(a.priority) - getPriorityValue(b.priority);
            break;
          case 'title':
            comparison = a.title.localeCompare(b.title);
            break;
          default:
            comparison = new Date(a.createdAt) - new Date(b.createdAt);
        }
        return direction === 'desc' ? -comparison : comparison;
      });

      return filtered;
    },
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        weeklyData,
        notifications,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
        clearAllTasks,
        filterAndSortTasks,
        markNotificationRead,
        clearNotifications,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};