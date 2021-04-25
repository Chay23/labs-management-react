import styles from './Subjects.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSubjects, setSubjectId } from './SubjectsService';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() =>
    getSubjects().then(response => {
      setSubjects(response.data);
    })
  );

  return (
    <div className={styles.subjectList}>
      {subjects.map(subject => (
        <h3 className={styles.subjectItem}>
          <Link className={styles.linkToSubject} to={`/lectures/${subject.id}`} onClick={setSubjectId(subject.id)}>
            {subject.title}
          </Link>
        </h3>
      ))}
    </div>
  );
};

export default Subjects;
