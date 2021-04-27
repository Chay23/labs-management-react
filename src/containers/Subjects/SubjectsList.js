import styles from './Subjects.module.scss';
import { Link } from 'react-router-dom';
import { setSubjectId } from './SubjectsService';

export const SubjectsList = ({ subjects }) => {
  console.log(subjects);
  return (
    <>
      {subjects.length > 0 ? (
        subjects.map(subject => (
          <h3 className={styles.subjectItem} key={subject.id}>
            <Link
              className={styles.linkToSubject}
              to={`/subjects/${subject.id}/lectures`}
              onClick={() => setSubjectId(subject.id)}
            >
              {subject.title}
            </Link>
          </h3>
        ))
      ) : (
        <p>Список порожній</p>
      )}
    </>
  );
};
