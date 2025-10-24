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
    <div className="flex justify-center items-center space-x-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="glass px-5 py-3 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 font-medium"
      >
        ← Previous
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="glass px-5 py-3 text-white rounded-xl hover:shadow-lg transition-all duration-300"
          >
            1
          </button>
          {startPage > 2 && <span className="text-white px-2">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
            currentPage === page
              ? 'btn-gradient text-white shadow-lg scale-110'
              : 'glass text-white hover:shadow-lg'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < lastPage && (
        <>
          {endPage < lastPage - 1 && <span className="text-white px-2">...</span>}
          <button
            onClick={() => onPageChange(lastPage)}
            className="glass px-5 py-3 text-white rounded-xl hover:shadow-lg transition-all duration-300"
          >
            {lastPage}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="glass px-5 py-3 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 font-medium"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;