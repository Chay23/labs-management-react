import styles from './Lectures.module.scss';
import { Link } from 'react-router-dom';
import { getCookie } from '../../guards/GetCookie';

export const LecturesList = ({ lectures }) => {
  const subject_id = getCookie('subject_id');
  return (
    <>
      {lectures.length > 0 ? (
        lectures.map(lecture => (
          <h3 className={styles.lectureItem} key={lecture.id}>
            <Link
              className={styles.linkToLecture}
              to={`/subjects/${subject_id}/lectures/${lecture.id}`}
            >
              {lecture.title}
            </Link>
          </h3>
        ))
      ) : (
        <p>Список порожній</p>
      )}
    </>
  );
};
