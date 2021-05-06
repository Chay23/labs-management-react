import styles from './Subjects.module.scss';
import { Link } from 'react-router-dom';
import { setSubjectId } from './SubjectsService';
import { useState } from 'react';
import ConfirmDelete from './ConfirmDelete/ConfirmDelete';

export const SubjectsList = ({ subjects, is_instructor, setState }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalShow = e => {
    if (e !== undefined) {
      const subject_id = e.target.name;
      localStorage.setItem('subject_id', subject_id);
      setShowModal(prevState => !prevState);
    }
  };
  
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
            {is_instructor ? (
              <>
                <Link
                  to={`/subjects/${subject.id}/edit`}
                  className={'btn btn-primary'}
                >
                  Редагувати
                </Link>
                <button
                  className={'btn btn-danger'}
                  onClick={handleModalShow}
                  name={subject.id}
                >
                  Видалити
                </button>
              </>
            ) : null}
          </div>
        ))
      ) : (
        <p>Список порожній</p>
      )}
      <ConfirmDelete
        show={showModal}
        modalClosed={handleModalShow}
        setState={setState}
      />
    </>
  );
};
