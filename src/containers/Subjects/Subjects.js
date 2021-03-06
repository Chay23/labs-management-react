import styles from './Subjects.module.scss';
import { useEffect, useState } from 'react';
import {
  getInstructorsSubjects,
  getSubjects,
  getUserStatus,
} from './SubjectsService';
import { SubjectsList } from './SubjectsList';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const [state, setState] = useState(0);
  const is_instructor = getUserStatus();

  useEffect(() => {
    handleShowAlert();

    const handleGetSubjects = async () => {
      if (is_instructor) {
        return getInstructorsSubjects();
      } else {
        return getSubjects();
      }
    };

    setLoading(true);
    handleGetSubjects()
      .then(response => {
        setSubjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        handleShowAlert(error);
        setLoading(false);
      });
    return cleanLocalStorage();
  }, [is_instructor, state]);

  const cleanLocalStorage = () => {
    localStorage.removeItem('msg');
    localStorage.removeItem('subject_id');
  };

  const handleShowAlert = error => {
    if (error !== undefined) {
      setAlert({
        message: 'Виникла помилка. Спробуйте пізніше',
        type: 'danger',
      });
    } else if (localStorage.getItem('msg')) {
      setAlert({ message: localStorage.getItem('msg'), type: 'warning' });
    }
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
          <h2>
            {is_instructor ? 'Створені вами предмети' : 'Доступні предмети'}
          </h2>
          {is_instructor ? (
            <Link to='/subjects/create' className='btn btn-outline-dark'>
              Створити новий предмет
            </Link>
          ) : null}
          <hr />
          <div className={styles.subjectsList}>
            <SubjectsList
              subjects={subjects}
              is_instructor={is_instructor}
              setState={setState}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Subjects;
