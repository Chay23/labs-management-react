import styles from './Lectures.module.scss';
import { Link } from 'react-router-dom';
import { getCookie } from '../../guards/GetCookie';
import ConfirmDelete from './ConfirmDelete/ConfirmDelete';
import { useState } from 'react';

export const LecturesList = ({ lectures, is_instructor, setState }) => {
  const [showModal, setShowModal] = useState(false);
  const subject_id = getCookie('subject_id');

  const handleModalShow = e => {
    if (e !== undefined) {
      const lecture_id = e.target.name;
      localStorage.setItem('lecture_id', lecture_id);
      setShowModal(prevState => !prevState);
    }
  };

  return (
    <>
      {lectures.length > 0 ? (
        lectures.map(lecture => (
          <div key={lecture.id} className={styles.lectureTitle}>
            <div className={styles.lectureItem}>
              <h3>
                <Link
                  className={styles.linkToLecture}
                  to={`/subjects/${subject_id}/lectures/${lecture.id}`}
                >
                  {lecture.title}
                </Link>
              </h3>
              {is_instructor ? (
                <>
                  <Link
                    to={`/subjects/${subject_id}/lectures/${lecture.id}/edit`}
                    className={'btn btn-primary'}
                  >
                    Редагувати
                  </Link>
                  <button
                    className={'btn btn-danger'}
                    onClick={handleModalShow}
                    name={lecture.id}
                  >
                    Видалити
                  </button>
                </>
              ) : null}
            </div>
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
