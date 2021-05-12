import styles from './Lectures.module.scss';
import { useEffect, useState } from 'react';
import {
  getLectures,
  getSubjectId,
  getSubjectTitle,
  getUserStatus,
  verifySubjectId,
} from './LecturesService';
import { LecturesList } from './LecturesList';
import Spinner from '../../components/Spinner/Spinner';
import { Link, useHistory } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [subjectTitle, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const [state, setState] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lecturesPerPage] = useState(5);
  const history = useHistory();
  const subject_id = getSubjectId();
  const is_instructor = getUserStatus();

  useEffect(() => {
    if (verifySubjectId()) {
      setLoading(true);
      getLectures()
        .then(lectures => {
          setLectures(lectures);
          getSubjectTitle().then(title => setTitle(title));
          setLoading(false);
        })
        .catch(() => {
          handleShowAlert();
          setLoading(false);
        });
    } else {
      localStorage.setItem('msg', 'Виберіть будь ласка предмет');
      history.push('/subjects');
    }
    return localStorage.removeItem('lecture_id');
  }, [history, state]);

  const handleShowAlert = () => {
    setAlert({ message: 'Виникла помилка. Спробуйте пізніше', type: 'danger' });
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const indexOfLastLecture = currentPage * lecturesPerPage;
  const indexOfFirstLecture = indexOfLastLecture - lecturesPerPage;
  const currentLectures = lectures.slice(
    indexOfFirstLecture,
    indexOfLastLecture
  );

  return (
    <>
      {loading ? (
        <div className={styles.loading}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.content}>
          {alert ? (
            <div className={'alert alert-' + alert.type} role='alert'>
              {alert.message}
            </div>
          ) : null}
          <Link
            className={styles.customBtn + ' btn btn-outline-dark'}
            to='/subjects'
          >
            Назад
          </Link>
          <h2>Список лекцій: {subjectTitle}</h2>
          {is_instructor ? (
            <Link
              to={`/subjects/${subject_id}/lectures/create`}
              className='btn btn-success'
            >
              Створити лекцію
            </Link>
          ) : null}
          <hr />
          <div className={styles.lecturesList}>
            <LecturesList
              lectures={currentLectures}
              is_instructor={is_instructor}
              setState={setState}
            />
          </div>
          {lectures.length > lecturesPerPage ? (
            <>
              <hr />
              <Pagination
                elementsPerPage={lecturesPerPage}
                totalElements={lectures.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Lectures;
