"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PaginationStyleWrapper from "./Pagination.style";

const Pagination = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page numbers
    router.push(`?page=${page}`); // Update the query parameter in the URL
  };

  return (
    <PaginationStyleWrapper className="pagination_wrapper">
      {/* Previous Page Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1} // Disable on first page
        aria-label="Previous Page"
      >
        <FiChevronLeft />
      </button>

      {/* Render Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={pageNumber === currentPage ? "active" : ""}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // Disable on last page
        aria-label="Next Page"
      >
        <FiChevronRight />
      </button>
    </PaginationStyleWrapper>
  );
};

export default Pagination;
