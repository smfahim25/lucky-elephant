import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PaginationStyleWrapper from "./Pagination.style";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Array to hold page numbers, from 1 to totalPages
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationStyleWrapper className="pagination_wrapper">
      {/* Previous Button */}
      <Link href="# " onClick={() => onPageChange(Math.max(currentPage - 1, 1))}>
        <FiChevronLeft />
      </Link>

      {/* Loop through each page number */}
      {pageNumbers.map((page) => (
        <Link
          href="# "
          key={page}
          className={currentPage === page ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Link>
      ))}

      {/* Next Button */}
      <Link
        href="# "
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      >
        <FiChevronRight />
      </Link>
    </PaginationStyleWrapper>
  );
};

export default Pagination;
