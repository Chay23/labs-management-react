import styles from './Assignments.module.scss';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import {
  getAssignments,
  getSubjectTitle,
  verifySubjectId,
  getUserStatus,
  getSubjectId,
} from './AssignmentsService';
import AssignmentsList from './AssignmentsList';
import { Link, useHistory } from 'react-router-dom';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subjectTitle, setSubjectTitle] = useState('');
  const [state, setState] = useState(0);
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const history = useHistory();
  const is_instructor = getUserStatus();
  const subject_id = getSubjectId();

  useEffect(() => {
    if (verifySubjectId()) {
      setLoading(true);
      getAssignments()
        .then(response => {
          setAssignments(response.data);
          getSubjectTitle().then(title => setSubjectTitle(title));
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
          <h2>Список завдань: {subjectTitle}</h2>
          <Link
            to={`/subjects/${subject_id}/assignments/create`}
            className='btn btn-outline-dark'
          >
            Створити завдання
          </Link>
          <hr />
          <div className={styles.assignmentsList}>
            <AssignmentsList
              assignments={assignments}
              is_instructor={is_instructor}
              setState={setState}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Assignments;
