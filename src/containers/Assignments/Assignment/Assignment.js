import styles from './Assignment.module.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Spinner from '../../../components/Spinner/Spinner';
import {
  getAssignment,
  getUserId,
  sendSubmission,
  getUserStatus,
  getAssignmentFeedback,
  editFile,
} from './AssignmentService';
import EditorComponent from './EditorComponent';
import { fileExtensions } from './FileExtensions';
import { Link } from 'react-router-dom';
import Feedback from './Feedback';

const Assignment = () => {
  const [assignment, setAssignment] = useState([]);
  const [submission, setSubmision] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [editorRef, setEditorRef] = useState(React.createRef());
  const [language, setLanguage] = useState('javascript');
  const [sending, setSending] = useState(false);
  const [inputFile, setInputFile] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showFileSection, setShowFileSection] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);
  const [state, setState] = useState(1);
  const [useFile, setUseFile] = useState({
    input: false,
    editor: false,
  });
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const { subject_id, assignment_id } = useParams();
  const is_instructor = getUserStatus();

  useEffect(() => {
    setLoading(true);
    getAssignmentFeedback(assignment_id).then(response => {
      setSubmision(response.data);
      setShowSubmission(true);
    });
    getAssignment(assignment_id)
      .then(response => {
        setAssignment(response.data);
        setLoading(false);
      })
      .catch(() => {
        handleShowAlert();
        setLoading(false);
      });
  }, [assignment_id, state]);

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
      setDisabled(true);
    } else {
      setAlert({
        message: '',
        type: '',
      });
      setDisabled(false);
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
        setState(prevState => prevState + 1);
      })
      .catch(() => {
        setSending(false);
        handleShowAlert();
      });
  };

  const handleEdit = e => {
    e.preventDefault();
    const user_id = getUserId();
    let formData = new FormData();
    if (useFile.editor) {
      let file = handleCreateFileEditor();
      let fileExtension = handleFileExtension();
      formData.append('attached_file', file, fileExtension);
    } else {
      formData.append('attached_file', inputFile);
    }
    setSending(true);
    editFile(formData, user_id, assignment_id)
      .then(() => {
        setSending(false);
        handleShowSuccessAlert();
        setState(prevState => prevState + 1);
      })
      .catch(() => {
        setSending(false);
        handleShowAlert();
      });
  };

  const handleShowEditor = () => {
    setShowEditor(prevState => !prevState);
  };

  const handleShowFileSection = () => {
    setShowFileSection(prevState => !prevState);
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
          {is_instructor ? null : showSubmission ? (
            <Feedback
              submission={submission}
              handleCheckFileExtension={handleCheckFileExtension}
            />
          ) : null}
          <div className={styles.assignmentDesc}>
            <p
              className={styles.lectureText}
              dangerouslySetInnerHTML={{ __html: assignment.description }}
            ></p>
          </div>
          <div
            className={styles.inputFileSection}
            style={{ height: showFileSection ? '160px' : '82px' }}
          >
            <i
              className={`${styles.arrow} ${
                showFileSection ? styles.up : styles.down
              }`}
              onClick={handleShowFileSection}
            ></i>
            <h4>
              {useFile.input ? <div className={styles.circle}></div> : null}
              Завантажити файл (.js) (.ts) (.html) (.py) (.java)
            </h4>
            <input type='file' onChange={handleUseInputFile} />
          </div>
          <div
            className={styles.editorSection}
            style={{ height: showEditor ? '1000px' : '80px' }}
          >
            <i
              className={`${styles.arrow} ${
                showEditor ? styles.up : styles.down
              }`}
              onClick={handleShowEditor}
            ></i>
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
          {is_instructor ? null : showSubmission ? (
            <button
              className={styles.customBtn + ' btn btn-warning'}
              onClick={handleEdit}
              disabled={disabled}
            >
              {sending ? (
                <div className={styles.sending}>
                  <Spinner height={2.5} width={2.5} />
                </div>
              ) : (
                'Редагувати'
              )}
            </button>
          ) : (
            <button
              className={styles.customBtn + ' btn btn-success'}
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
          )}
        </div>
      )}
    </>
  );
};

export default Assignment;
