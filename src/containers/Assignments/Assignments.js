import styles from './Assignments.module.scss';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { getAssignments, getSubjectTitle } from './AssignmentsService';
import AssignmentsList from './AssignmentsList';
import { Link, useParams } from 'react-router-dom';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subjectTitle, setSubjectTitle] = useState('');
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

  useEffect(() => {
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
  }, []);

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
          <hr />
          <div className={styles.assignmentsList}>
            <AssignmentsList assignments={assignments} />
          </div>
        </div>
      )}
    </>
  );
};

export default Assignments;
