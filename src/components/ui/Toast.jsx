import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const config = {
  success: {
    icon: CheckCircle2,
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    shadow: 'rgba(16, 185, 129, 0.35)',
  },
  error: {
    icon: AlertCircle,
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    shadow: 'rgba(239, 68, 68, 0.35)',
  },
  info: {
    icon: Info,
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    shadow: 'rgba(99, 102, 241, 0.35)',
  },
};

export default function Toast() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      role="log"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const item = config[toast.type] || config.info;
        const Icon = item.icon;
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl text-white shadow-xl animate-entrance backdrop-blur-md"
            style={{
              background: item.gradient,
              boxShadow: `0 8px 25px -4px ${item.shadow}`,
            }}
            role="alert"
          >
            <Icon size={19} strokeWidth={2.4} className="flex-shrink-0" />
            <span className="text-[13.5px] font-bold flex-1 leading-tight">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
