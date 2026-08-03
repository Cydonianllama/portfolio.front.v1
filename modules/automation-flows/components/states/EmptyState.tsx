import { ReactNode } from "react";

type EmptyStateProps = {
  Icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ Icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 rounded-lg bg-gray-50/50 px-4 py-6 text-center">
      {Icon && (
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-muted-foreground">
          {Icon}
        </span>
      )}
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
