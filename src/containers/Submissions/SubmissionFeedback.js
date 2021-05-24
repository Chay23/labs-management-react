import styles from './Submissions.module.scss';
import { useState } from 'react';
import { sendFeedback } from './SubmissionsService';

const SubmisisonFeedback = ({ prevFeedback, user_id, submission_id, setAlert }) => {
  const [feedback, setFeedback] = useState(prevFeedback);

  const handleFeedbackChange = e => {
    const feedbackValue = e.target.value;
    setFeedback(feedbackValue);
  };


  const handleSendFeedback = () => {
    const data = { feedback: feedback };
    sendFeedback(data, submission_id)
      .then(response => {
        setAlert({ message: 'Відгук надіслано', type: 'success' });
      })
      .catch(() => {
        setAlert({
          message: 'Сталась помилка. Спробуйте пізніше',
          type: 'danger',
        });
      });
  };

  return (
    <div>
      <textarea
        className='form-control'
        placeholder='Надіслати відгук'
        value={feedback}
        onChange={handleFeedbackChange}
      ></textarea>
      <button
        className={styles.sendBtn + ' btn btn-primary'}
        onClick={handleSendFeedback}
      >
        Надіслати
      </button>
    </div>
  );
};

export default SubmisisonFeedback;
