import styles from './EditAssignment.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';
import { getAssignmentData, editAssignment } from './EditAssignmentService';
import Editor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const EditAssignment = () => {
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    subject: null,
    created_by: null,
  });
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const { assignment_id, subject_id } = useParams();

  useEffect(() => {
    setLoading(true);
    getAssignmentData(assignment_id).then(response => {
      const data = response.data;
      setAssignmentData({
        title: data.title,
        description: data.description,
        created_by: data.created_by,
        subject: data.subject,
      });
      setLoading(false);
    });
  }, [assignment_id]);

  const handleChangeTitle = e => {
    const title = e.target.value;
    setAssignmentData({ ...assignmentData, title: title });
  };

  const handleChangeDescription = (event, editor) => {
    const data = editor.getData();
    setAssignmentData({ ...assignmentData, description: data });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    editAssignment(assignment_id, assignmentData)
      .then(() => {
        handleShowSuccessAlert();
        setSending(false);
      })
      .catch(error => {
        handleShowErrorAlert(error);
        setSending(false);
      });
  };

  const handleShowSuccessAlert = () => {
    setAlert({
      message: 'Успішно редаговано',
      type: 'success',
    });
  };

  const handleShowErrorAlert = error => {
    if (error.response) {
      setAlert({
        message: 'Невірно введені дані',
        type: 'danger',
      });
    } else if (error.request) {
      setAlert({
        message: 'Виникла помилка',
        type: 'danger',
      });
    }
  };

  return (
    <>
      {loading ? (
        <div className={styles.loading}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.content}>
          {alert ? (
            <div className={'alert alert-' + alert.type} role='alert'>
              {alert.message}
            </div>
          ) : null}
          <Link
            to={`/subjects/${subject_id}/lectures`}
            className={styles.customBackBtn + ' btn btn-outline-dark'}
          >
            Назад
          </Link>
          <h2>Редагувати завдання</h2>
          <hr />
          <div className={styles.formSection}>
            <form onSubmit={handleSubmit}>
              <p>Заголовок завдання</p>
              <input
                className='form-control'
                value={assignmentData.title}
                onChange={handleChangeTitle}
              ></input>
              <p>Текст завдання</p>
              <CKEditor
                editor={Editor}
                data={assignmentData.description}
                onChange={handleChangeDescription}
              />
              <button
                className={styles.customSubmitBtn + ' btn btn-outline-dark'}
              >
                {sending ? <Spinner height={2.5} width={2.5} /> : 'Редагувати'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAssignment;
