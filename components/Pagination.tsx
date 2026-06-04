import { ResponsePagination } from '@/types/utils.pagination';

interface PaginationProps {
  pagination: ResponsePagination | null;
  currentPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  compact?: boolean;
}

export default function Pagination({
  pagination,
  currentPage,
  onPreviousPage,
  onNextPage,
  compact = false
}: PaginationProps) {
  if (!pagination) return null;

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-2">
        <button
          disabled={!pagination.hasPreviousPage}
          onClick={onPreviousPage}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>
        <span className="text-xs text-slate-600">{pagination.total}</span>
        <button
          disabled={!pagination.hasNextPage}
          onClick={onNextPage}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente →
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
      <span className="text-sm text-slate-600">Total: {pagination.total}</span>
      <div className="flex gap-2">
        <button
          disabled={!pagination.hasPreviousPage}
          onClick={onPreviousPage}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>
        <span className="flex items-center px-3 py-1.5 text-sm text-slate-700">
          Página {currentPage}
        </span>
        <button
          disabled={!pagination.hasNextPage}
          onClick={onNextPage}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
