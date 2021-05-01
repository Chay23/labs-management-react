import styles from './Assignment.module.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Spinner from '../../../components/Spinner/Spinner';
import { getAssignment, getUserId, sendSubmission } from './AssignmentService';
import EditorComponent from './EditorComponent';
import { fileExtensions } from './FileExtensions';
import { Link } from 'react-router-dom';

const Assignment = () => {
  const [assignment, setAssignment] = useState({});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [editorRef, setEditorRef] = useState(React.createRef());
  const [language, setLanguage] = useState('javascript');
  const [sending, setSending] = useState(false);
  const [inputFile, setInputFile] = useState(null);
  const [useFile, setUseFile] = useState({
    input: false,
    editor: false,
  });
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const { subject_id, assignment_id } = useParams();

  useEffect(() => {
    setLoading(true);
    getAssignment(assignment_id)
      .then(response => {
        setAssignment(response.data);
        setLoading(false);
      })
      .catch(() => {
        handleShowAlert();
        setLoading(false);
      });
  }, [assignment_id]);

  const handleShowAlert = () => {
    setAlert({
      message: 'Виникла помилка. Спробуйте пізніше',
      type: 'danger',
    });
  };

  const handleButtonChangeState = () => {
    if (editorRef.current.getValue().length === 0) {
      setDisabled(true);
      setUseFile({
        input: false,
        editor: false,
      });
    } else {
      setDisabled(false);
      setUseFile({
        input: false,
        editor: true,
      });
    }
  };

  const handleUseInputFile = e => {
    const file = e.target.value;
    if (file.length > 0) {
      if (handleCheckFileExtension(file)) {
        setInputFile(e.target.files[0]);
        setDisabled(false);
        setUseFile({
          input: true,
          editor: false,
        });
      }
    }
  };

  const handleShowFileExtensionAlert = active => {
    if (active) {
      setAlert({
        message: 'Невірне розширення файлу',
        type: 'danger',
      });
    } else {
      setAlert({
        message: '',
        type: '',
      });
    }
  };

  const handleCheckFileExtension = file => {
    const validExtension = file.match(
      /[-\s\w\d]*((.js)|(.ts)|(.py)|(.java)|(.html))$/
    );
    if (!validExtension) {
      handleShowFileExtensionAlert(1);
      return false;
    }
    handleShowFileExtensionAlert(0);
    return true;
  };

  const getEditorValue = () => {
    return editorRef.current.getValue();
  };

  const handleCreateFileEditor = () => {
    let data = getEditorValue();
    let blob = new Blob([data], { type: 'text/plain' });
    let file = new File([blob], 'name');
    return file;
  };

  const handleFileExtension = () => {
    return fileExtensions[language];
  };

  const handleShowSuccessAlert = () => {
    setAlert({
      message: 'Успішно надіслано',
      type: 'success',
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData();
    if (useFile.editor) {
      let file = handleCreateFileEditor();
      let fileExtension = handleFileExtension();
      formData.append('attached_file', file, fileExtension);
    } else {
      formData.append('attached_file', inputFile);
    }
    formData.append('feedback', '');
    formData.append('assignment', assignment_id);
    formData.append('created_by', getUserId());
    setSending(true);
    sendSubmission(formData)
      .then(() => {
        setSending(false);
        handleShowSuccessAlert();
      })
      .catch(() => {
        setSending(false);
        handleShowAlert();
      });
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
            className={styles.customBackBtn + ' btn btn-outline-dark'}
            to={`/subjects/${subject_id}/assignments`}
          >
            Назад
          </Link>
          <h3>{assignment.title}</h3>
          <hr />
          <div className={styles.assignmentDesc}>
            <p
              className={styles.lectureText}
              dangerouslySetInnerHTML={{ __html: assignment.description }}
            ></p>
          </div>
          <div className={styles.inputFileSection}>
            <h4>
              {useFile.input ? <div className={styles.circle}></div> : null}
              Завантажити файл (.js) (.ts) (.html) (.py) (.java)
            </h4>
            <input type='file' onChange={handleUseInputFile} />
          </div>
          <div className={styles.editorSection}>
            <h4>
              {useFile.editor ? <div className={styles.circle}></div> : null}
              Написати код в редакторі
            </h4>
            <EditorComponent
              handleButtonChangeState={handleButtonChangeState}
              setEditorRef={setEditorRef}
              language={language}
              setLanguage={setLanguage}
            />
          </div>
          <button
            className={styles.customBtn + ' btn btn-outline-dark'}
            onClick={handleSubmit}
            disabled={disabled}
          >
            {sending ? (
              <div className={styles.sending}>
                <Spinner height={2.5} width={2.5} />
              </div>
            ) : (
              'Надіслати'
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default Assignment;
