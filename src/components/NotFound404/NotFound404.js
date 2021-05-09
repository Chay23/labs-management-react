import styles from './NotFound.module.scss';

const NotFound404 = () => {
  return (
    <div className={styles.content}>
      <h1>Не знайдено 404</h1>
      <p>Такої сторінки не існує</p>
    </div>
  );
};

export default NotFound404;
