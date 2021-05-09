import styles from './Assignments.module.scss';
import { getCookie } from '../../guards/GetCookie';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConfirmDelete from './ConfirmDelete/ConfirmDelete';

const AssignmentsList = ({ assignments, is_instructor, setState }) => {
  const [showModal, setShowModal] = useState(false);
  const subject_id = getCookie('subject_id');

  const handleModalShow = e => {
    if (e !== undefined) {
      const assignment_id = e.target.name;
      localStorage.setItem('assignment_id', assignment_id);
      setShowModal(prevState => !prevState);
    }
  };

  return (
    <>
      {assignments.length > 0 ? (
        assignments.map(assignment => (
          <div className={styles.assignmentItem} key={assignment.id}>
            <h3>
              <Link
                className={styles.linkToAssignment}
                to={`/subjects/${subject_id}/assignments/${assignment.id}`}
              >
                {assignment.title}
              </Link>
            </h3>
            {is_instructor ? (
              <>
                <Link
                  to={`/subjects/${subject_id}/assignments/${assignment.id}/edit`}
                  className={'btn btn-primary'}
                >
                  Редагувати
                </Link>
                <button
                  className={'btn btn-danger'}
                  onClick={handleModalShow}
                  name={assignment.id}
                >
                  Видалити
                </button>
                <Link
                  to={`/subjects/${subject_id}/assignments/${assignment.id}/submissions`}
                  className='btn btn-outline-dark'
                >
                  Виконанні завдання
                </Link>
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

export default AssignmentsList;
