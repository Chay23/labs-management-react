import styles from './EditLecture.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';
import { getLectureData, editLecture } from './EditLecureService';
import Editor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const EditLecture = () => {
  const [lectureData, setLectureData] = useState({
    title: '',
    text: '',
    created_by: null,
    subject: null,
  });
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const { lecture_id, subject_id } = useParams();

  useEffect(() => {
    setLoading(true);
    getLectureData(lecture_id).then(response => {
      const data = response.data;
      setLectureData({
        title: data.title,
        text: data.text,
        created_by: data.created_by,
        subject: data.subject,
      });
      setLoading(false);
    });
  }, [lecture_id]);

  const handleChangeTitle = e => {
    const title = e.target.value;
    setLectureData({ ...lectureData, title: title });
  };

  const handleChangeText = (event, editor) => {
    const data = editor.getData();
    setLectureData({ ...lectureData, text: data });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    editLecture(lecture_id, lectureData)
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
          <h2>Редагувати предмет</h2>
          <hr />
          <div className={styles.formSection}>
            <form onSubmit={handleSubmit}>
              <p>Назва</p>
              <input
                className='form-control'
                value={lectureData.title}
                onChange={handleChangeTitle}
              ></input>
              <p>Текст</p>
              <CKEditor
                editor={Editor}
                data={lectureData.text}
                onChange={handleChangeText}
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

export default EditLecture;
