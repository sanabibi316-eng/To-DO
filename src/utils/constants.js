export const CATEGORIES = [
  { id: 'work', label: 'Work', color: '#8b5cf6', bgColor: '#f5f3ff', darkBgColor: '#2d1b69' },
  { id: 'personal', label: 'Personal', color: '#06b6d4', bgColor: '#ecfeff', darkBgColor: '#164e63' },
  { id: 'study', label: 'Study', color: '#f59e0b', bgColor: '#fffbeb', darkBgColor: '#78350f' },
  { id: 'health', label: 'Health', color: '#10b981', bgColor: '#ecfdf5', darkBgColor: '#064e3b' },
];

export const PRIORITIES = [
  { id: 'low', label: 'Low', color: '#10b981', bgColor: '#ecfdf5', darkBgColor: '#064e3b', icon: '○' },
  { id: 'medium', label: 'Medium', color: '#f59e0b', bgColor: '#fffbeb', darkBgColor: '#78350f', icon: '◑' },
  { id: 'high', label: 'High', color: '#ef4444', bgColor: '#fef2f2', darkBgColor: '#7f1d1d', icon: '●' },
];

export const SORT_OPTIONS = [
  { id: 'createdAt-desc', label: 'Recently Created' },
  { id: 'dueDate-asc', label: 'Due Date (Earliest)' },
  { id: 'dueDate-desc', label: 'Due Date (Latest)' },
  { id: 'priority-desc', label: 'Priority (High → Low)' },
  { id: 'priority-asc', label: 'Priority (Low → High)' },
  { id: 'title-asc', label: 'Alphabetical (A → Z)' },
  { id: 'title-desc', label: 'Alphabetical (Z → A)' },
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/' },
  { id: 'tasks', label: 'My Tasks', path: '/tasks' },
  { id: 'today', label: 'Today', path: '/today' },
  { id: 'upcoming', label: 'Upcoming', path: '/upcoming' },
  { id: 'completed', label: 'Completed', path: '/completed' },
  { id: 'settings', label: 'Settings', path: '/settings' },
];