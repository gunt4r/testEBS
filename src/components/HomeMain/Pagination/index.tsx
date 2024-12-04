import style from "./stylePagination.module.css"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, setPage }: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={style["section-product__pagination"]}>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setPage(number)}
          className={`${number === currentPage ? `${style["section-product__pagination-active"]}` : ""} ${style['section-product__pagination-item']}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
