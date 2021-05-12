import styles from './Submissions.module.scss';
import { useState } from 'react';
import { sendFeedback } from './SubmissionsService';
import { useParams } from 'react-router';

const SubmisisonFeedback = ({ prevFeedback, user_id, setAlert }) => {
  const [feedback, setFeedback] = useState(prevFeedback);
  const { assignment_id } = useParams();

  const handleFeedbackChange = e => {
    const feedbackValue = e.target.value;
    setFeedback(feedbackValue);
  };

  const handleSendFeedback = () => {
    const data = { feedback: feedback };
    sendFeedback(data, user_id, assignment_id)
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
