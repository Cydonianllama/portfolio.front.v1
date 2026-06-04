import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ 
  icon, 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 py-12 px-4">
      {icon && (
        <div className="text-4xl text-slate-400">
          {icon}
        </div>
      )}
      {!icon && (
        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
          <span className="text-xl text-slate-400">📭</span>
        </div>
      )}
      <div className="text-center">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
