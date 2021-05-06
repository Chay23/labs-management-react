import styles from './CreateLecture.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';
import { getUserId, createLecture, getSubjectId } from './CreateLectureService';
import Editor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const CreateLecture = () => {
  const [lectureData, setLectureData] = useState({
    title: '',
    text: '',
    created_by: null,
    subject: null,
  });
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);
  const subject_id = getSubjectId();
  const user_id = getUserId();

  const handleChange = e => {
    setLectureData({ ...lectureData, [e.target.name]: e.target.value });
  };

  const handleChangeEditor = (event, editor) => {
    const data = editor.getData();
    setLectureData({ ...lectureData, text: data });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let data = {
      title: lectureData.title,
      text: lectureData.text,
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
      <h3>Створити новий предмет</h3>
      <hr />
      <div className={styles.formSection}>
        <form onSubmit={handleSubmit}>
          <p>Заголовок лекції</p>
          <input
            className='form-control'
            value={lectureData.title}
            onChange={handleChange}
            name='title'
          ></input>
          <p>Текст лекції</p>
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

export default CreateLecture;
