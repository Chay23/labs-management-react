import styles from './Subjects.module.scss';
import { Link } from 'react-router-dom';
import { setSubjectId } from './SubjectsService';

export const SubjectsList = ({ subjects }) => {
  return (
    <>
      {subjects.length > 0 ? (
        subjects.map(subject => (
          <div className={styles.subjectItem} key={subject.id}>
            <div className={styles.subjctTitle}>
              <h3>
                <Link
                  className={styles.linkToSubject}
                  to={`/subjects/${subject.id}/lectures`}
                  onClick={() => setSubjectId(subject.id)}
                >
                  {subject.title}
                </Link>
              </h3>
            </div>
            <div className={`${styles.subjectDescription}`}>
              <p>
                Опис предмету
                <i className={`${styles.arrow} ${styles.down}`}></i>
              </p>
              <p>{subject.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Список порожній</p>
      )}
    </>
  );
};
