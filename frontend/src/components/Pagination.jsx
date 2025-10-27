import './Pagination.css';

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
  const pages = [];
  const maxVisible = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(lastPage, startPage + maxVisible - 1);
  
  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        ← Previous
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="pagination-btn"
          >
            1
          </button>
          {startPage > 2 && <span className="pagination-dots">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}

      {endPage < lastPage && (
        <>
          {endPage < lastPage - 1 && <span className="pagination-dots">...</span>}
          <button
            onClick={() => onPageChange(lastPage)}
            className="pagination-btn"
          >
            {lastPage}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="pagination-btn"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;