import styles from './Assignment.module.scss';
import { baseUrl } from '../../../config';

const Feedback = ({ submission, handleCheckFileExtension }) => {
  const getAttachedFileName = () => {
    let fileName = decodeURIComponent(submission.attached_file);
    fileName = fileName.match(/[-\s\w\d а-яА-яІЇії]*.[a-z]*$/);
    return fileName[0];
  };

  const filename = getAttachedFileName();
  let feedback;
  if (submission.feedback !== undefined) {
    feedback =
      submission.feedback.length > 0
        ? submission.feedback
        : 'Дочекайтесь поки завдання перевірять!';
  }

  return (
    <div className={styles.submissionSection}>
      <h4>Виконане завдання</h4>
      <p>
        {'Файл: '}
        <a
          className={styles.linkToSubmission}
          href={baseUrl + `/submissions/file/${filename}}`}
        >
          {getAttachedFileName(submission.attached_file)}
        </a>
      </p>
      <p>Відгук: {feedback}</p>
    </div>
  );
};

export default Feedback;
