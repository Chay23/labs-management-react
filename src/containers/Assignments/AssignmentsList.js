import styles from './Assignments.module.scss';
import { getCookie } from '../../guards/GetCookie';
import { Link } from 'react-router-dom';

const AssignmentsList = ({ assignments }) => {
  const subject_id = getCookie('subject_id');
  return (
    <>
      {assignments.length > 0 ? (
        assignments.map(assignment => (
          <h3 className={styles.assignmentItem} key={assignment.id}>
            <Link
              className={styles.linkToAssignment}
              to={`/subjects/${subject_id}/assignments/${assignment.id}`}
            >
              {assignment.title}
            </Link>
          </h3>
        ))
      ) : (
        <p>Список порожній</p>
      )}
    </>
  );
};

export default AssignmentsList;
