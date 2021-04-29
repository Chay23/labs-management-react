import styles from './Lecture.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Spinner from '../../../components/Spinner/Spinner';
import { getLecture } from './LectureService';
import { Link } from 'react-router-dom';

const Lecture = () => {
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const { subject_id, lecture_id } = useParams();

  useEffect(() => {
    setLoading(true);
    getLecture(lecture_id)
      .then(response => {
        setLecture(response.data);
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
            to={`/subjects/${subject_id}/lectures`}
          >
            Назад
          </Link>
          <h3>{lecture.title}</h3>
          <hr />
          <p
            className={styles.lectureText}
            dangerouslySetInnerHTML={{ __html: lecture.text }}
          ></p>
        </div>
      )}
    </>
  );
};

export default Lecture;
