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

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [subjectTitle, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const [state, setState] = useState(0);
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
          <Link
            to={`/subjects/${subject_id}/lectures/create`}
            className='btn btn-outline-dark'
          >
            Створити лекцію
          </Link>
          <hr />
          <div className={styles.lecturesList}>
            <LecturesList
              lectures={lectures}
              is_instructor={is_instructor}
              setState={setState}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Lectures;
