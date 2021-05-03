import styles from './Subjects.module.scss';
import { useEffect, useState } from 'react';
import { getSubjects } from './SubjectsService';
import { SubjectsList } from './SubjectsList';
import Spinner from '../../components/Spinner/Spinner';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

  useEffect(() => {
    handleShowAlert();
    setLoading(true);
    getSubjects()
      .then(response => {
        setSubjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        handleShowAlert(error);
        setLoading(false);
      });
    return localStorage.removeItem('msg');
  }, []);

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
          <h2>Доступні предмети</h2>
          <hr />
          <div className={styles.subjectsList}>
            <SubjectsList subjects={subjects} />
          </div>
        </div>
      )}
    </>
  );
};

export default Subjects;
