import styles from './Submissions.module.scss';
import { useState } from 'react';
import { baseUrl } from '../../config';
import { getAttachedFileName } from './SubmissionsService';
import ConfirmDelete from './ConfirmDelete/ConfirmDelele';
import SubmissionFeedback from './SubmissionFeedback';

const SubmissionsList = ({ submissions, setState, setAlert }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalShow = e => {
    if (e !== undefined) {
      const submission_id = e.target.name;
      localStorage.setItem('submission_id', submission_id);
      setShowModal(prevState => !prevState);
    }
  };

  return (
    <>
      {submissions.length > 0 ? (
        submissions.map(submission => (
          <div className={styles.submissionsItem} key={submission.id}>
            <a
              className={styles.linkToSubmission}
              href={
                baseUrl +
                `/submissions/file/${getAttachedFileName(
                  submission.attached_file
                )}/`
              }
            >
              {getAttachedFileName(submission.attached_file)}
            </a>
            <button
              className={styles.deleteBtn + ' btn btn-danger'}
              onClick={handleModalShow}
              name={submission.id}
            >
              Видалити
            </button>
            <hr />
            <SubmissionFeedback
              prevFeedback={submission.feedback}
              user_id={submission.created_by}
              submission_id={submission.id}
              setAlert={setAlert}
            />
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

export default SubmissionsList;
