import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PAGINATION_CONFIG, PaginatedResponse } from '@/lib/apiConfig';
import { cn } from '@/lib/utils';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';

export interface PaginationControlsProps<T = any> {
  /** Paginated data from API */
  data: PaginatedResponse<T> | null | undefined;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Callback when items per page changes */
  onPerPageChange?: (perPage: number) => void;
  /** Show items per page selector */
  showPerPageSelector?: boolean;
  /** Show page info text (e.g., "Showing 1 to 15 of 100 items") */
  showPageInfo?: boolean;
  /** Show first/last page buttons */
  showFirstLastButtons?: boolean;
  /** Custom class name */
  className?: string;
  /** Loading state */
  isLoading?: boolean;
}

export function PaginationControls<T = any>({
  data,
  onPageChange,
  onPerPageChange,
  showPerPageSelector = true,
  showPageInfo = true,
  showFirstLastButtons = true,
  className,
  isLoading = false,
}: PaginationControlsProps<T>) {
  if (!data || data.total === 0) {
    return null;
  }

  const currentPage = data.current_page;
  const totalPages = data.last_page;
  const perPage = data.per_page;
  const total = data.total;
  const from = data.from || 0;
  const to = data.to || 0;

  const canGoToPrevious = currentPage > 1;
  const canGoToNext = currentPage < totalPages;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const handlePerPageChange = (value: string) => {
    if (onPerPageChange) {
      onPerPageChange(parseInt(value, 10));
    }
  };

  // Generate page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-nexus-border',
        className
      )}
    >
      {/* Left side: Page info and per page selector */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-nexus-muted">
        {showPageInfo && (
          <div className="whitespace-nowrap">
            Showing <span className="font-medium text-white">{from}</span> to{' '}
            <span className="font-medium text-white">{to}</span> of{' '}
            <span className="font-medium text-white">{total}</span> items
          </div>
        )}

        {showPerPageSelector && onPerPageChange && (
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap">Items per page:</span>
            <Select
              value={perPage.toString()}
              onValueChange={handlePerPageChange}
              disabled={isLoading}
            >
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGINATION_CONFIG.pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Right side: Pagination controls */}
      <div className="flex items-center gap-2">
        {/* First page button */}
        {showFirstLastButtons && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(1)}
            disabled={!canGoToPrevious || isLoading}
            title="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Previous page button */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!canGoToPrevious || isLoading}
          title="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-nexus-muted"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <Button
                key={pageNum}
                variant={isActive ? 'default' : 'outline'}
                size="icon"
                className={cn(
                  'h-8 w-8',
                  isActive && 'gradient-primary text-white border-0'
                )}
                onClick={() => handlePageChange(pageNum)}
                disabled={isLoading}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        {/* Next page button */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!canGoToNext || isLoading}
          title="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last page button */}
        {showFirstLastButtons && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(totalPages)}
            disabled={!canGoToNext || isLoading}
            title="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

// Compact version for smaller spaces
export interface CompactPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  className?: string;
}

export function CompactPagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  className,
}: CompactPaginationProps) {
  const canGoToPrevious = currentPage > 1;
  const canGoToNext = currentPage < totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn('flex items-center justify-between gap-2', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoToPrevious || isLoading}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      <span className="text-sm text-nexus-muted">
        Page <span className="font-medium text-white">{currentPage}</span> of{' '}
        <span className="font-medium text-white">{totalPages}</span>
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoToNext || isLoading}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
