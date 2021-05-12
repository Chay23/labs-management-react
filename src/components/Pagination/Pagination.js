import styles from './Pagination.module.scss';

const Pagination = ({
  elementsPerPage,
  totalElements,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className={styles.pagination}>
        {pageNumbers.map(number => (
          <div key={number} className={styles.pageItem}>
            <p
              onClick={() => paginate(number)}
              className={number === currentPage ? styles.active : null}
            >
              {number}
            </p>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
