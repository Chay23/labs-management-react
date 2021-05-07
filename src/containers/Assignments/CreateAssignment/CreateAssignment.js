import styles from './CreateAssignment.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';
import {
  getUserId,
  createLecture,
  getSubjectId,
} from './CreateAssignmentService';
import Editor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const CreateAssignment = () => {
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    subject: null,
    created_by: null,
  });
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);
  const subject_id = getSubjectId();
  const user_id = getUserId();

  const handleChange = e => {
    setAssignmentData({ ...assignmentData, [e.target.name]: e.target.value });
  };

  const handleChangeEditor = (event, editor) => {
    const data = editor.getData();
    setAssignmentData({ ...assignmentData, description: data });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let data = {
      title: assignmentData.title,
      description: assignmentData.description,
      created_by: user_id,
      subject: subject_id,
    };
    setLoading(true);
    createLecture(data)
      .then(() => {
        handleShowSuccessAlert();
        setLoading(false);
      })
      .catch(error => {
        handleShowErrorAlert(error);
        setLoading(false);
      });
  };

  const handleShowSuccessAlert = () => {
    setAlert({
      message: 'Успішно створено',
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
      <h3>Створити нове завдання</h3>
      <hr />
      <div className={styles.formSection}>
        <form onSubmit={handleSubmit}>
          <p>Заголовок завдання</p>
          <input
            className='form-control'
            value={assignmentData.title}
            onChange={handleChange}
            name='title'
          ></input>
          <p>Текст завдання</p>
          <CKEditor editor={Editor} onChange={handleChangeEditor} />
          <button className={styles.customSubmitBtn + ' btn btn-outline-dark'}>
            {loading ? (
              <div>
                <Spinner height={2.5} width={2.5} />
              </div>
            ) : (
              'Створити'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
