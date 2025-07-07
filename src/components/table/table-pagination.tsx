import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { type MetaData } from "@/types";

type TablePaginationProps = {
  metadata: MetaData;
  onMetadataChange: (metadata: MetaData) => void;
  removeAllRowsPerPage?: boolean;
};

const pageSizeOptions = [15, 20, 50, 100, 1000];

const generateSizeOptions = (total: number, removeAllRowsPerPage: boolean) => {
  const generatedSizeOptions = pageSizeOptions.filter((size) => size <= total);
  if (removeAllRowsPerPage) {
    return generatedSizeOptions;
  }
  return [...generatedSizeOptions, -1];
};

export function TablePagination({
  metadata,
  onMetadataChange,
  removeAllRowsPerPage = false,
}: TablePaginationProps) {
  const totalPages = Math.ceil(metadata.total / metadata.limit);
  const currentPage = metadata.page;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                onMetadataChange({
                  ...metadata,
                  page: i,
                });
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={currentPage === 1}
            onClick={(e) => {
              e.preventDefault();
              onMetadataChange({
                ...metadata,
                page: 1,
              });
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if needed
      if (currentPage > 3) {
        pages.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show current page and surrounding pages
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                onMetadataChange({
                  ...metadata,
                  page: i,
                });
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        pages.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            isActive={currentPage === totalPages}
            onClick={(e) => {
              e.preventDefault();
              onMetadataChange({
                ...metadata,
                page: totalPages,
              });
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    metadata.total > 15 && (
      <div className="mt-4 flex justify-between px-2">
        <div className="flex items-center gap-2">
          {metadata.total > 15 && (
            <>
              <span className="mb-2 text-sm text-muted-foreground">
                Rows per page:
              </span>
              <Select
                value={metadata.limit.toString()}
                onValueChange={(size) => {
                  onMetadataChange({
                    ...metadata,
                    limit: parseInt(size),
                    page: 1,
                  });
                }}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {generateSizeOptions(
                    metadata.total,
                    removeAllRowsPerPage
                  ).map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size === -1 ? "All" : size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Pagination>
            <PaginationContent>
              {/* previous button */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      onMetadataChange({
                        ...metadata,
                        page: +currentPage - 1,
                      });
                    }
                  }}
                />
              </PaginationItem>

              {/* page numbers */}
              {renderPageNumbers()}

              {/* next button */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      onMetadataChange({
                        ...metadata,
                        page: +currentPage + 1,
                      });
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    )
  );
}
