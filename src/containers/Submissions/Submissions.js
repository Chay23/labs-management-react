import styles from './Submissions.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import SubmissionsList from './SubmissionsList';
import {
  getSubmissions,
  getSubjectTitle,
  getSubjectId,
} from './SubmissionsService';
import { Link } from 'react-router-dom';
import { submissionFilter } from './SubmissionsFilter';
import Spinner from '../../components/Spinner/Spinner';

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [subjectTitle, setSubjectTitle] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(0);
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const { assignment_id } = useParams();
  const subject_id = getSubjectId();

  useEffect(() => {
    setLoading(true);
    getSubjectTitle().then(title => setSubjectTitle(title));
    getSubmissions(assignment_id)
      .then(response => {
        setSubmissions(response.data);
        setLoading(false);
      })
      .catch(() => {
        handleShowAlert();
        setLoading(false);
      });
  }, [assignment_id, state]);

  const handleShowAlert = () => {
    setAlert({ message: 'Виникла помилка. Спробуйте пізніше', type: 'danger' });
  };

  const handleSearchChange = e => {
    const search = e.target.value;
    setSearchValue(search);
  };

  const submissionsData = searchValue
    ? submissionFilter(submissions, searchValue)
    : submissions;

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
            to={`/subjects/${subject_id}/assignments`}
            className={styles.customBtn + ' btn btn-outline-dark'}
          >
            Назад
          </Link>
          <h2>Список виконаних завдань: {subjectTitle}</h2>
          <hr />
          <p>
            Пошук
            <input
              className='form-control'
              value={searchValue}
              onChange={handleSearchChange}
            />
          </p>
          <div className={styles.submissionsList}>
            <SubmissionsList
              submissions={submissionsData}
              setState={setState}
              setAlert={setAlert}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Submissions;
