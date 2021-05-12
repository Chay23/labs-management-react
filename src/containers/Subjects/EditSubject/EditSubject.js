import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Spinner from '../../../components/Spinner/Spinner';
import styles from './EditSubject.module.scss';
import { getSubjectData, getGroups, editSubject } from './EditSubjectService';

const EditSubject = () => {
  const [subjectData, setSubjectData] = useState({
    title: '',
    description: '',
    created_by: null,
    group: [],
  });
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const { subject_id } = useParams();

  useEffect(() => {
    const handleGetGroups = () => {
      getGroups().then(response => setGroups(response.data));
    };
    setLoading(true);
    handleGetGroups();
    getSubjectData(subject_id).then(response => {
      const data = response.data;
      setSubjectData({
        title: data.title,
        description: data.description,
        created_by: data.created_by,
        group: data.group,
      });
      setLoading(false);
    });
  }, [subject_id]);

  const handleChangeTitle = e => {
    const title = e.target.value;
    setSubjectData({ ...subjectData, title: title });
  };

  const handleChangeDescription = e => {
    const description = e.target.value;
    setSubjectData({ ...subjectData, description: description });
  };

  const handleGroupsSelected = groups => {
    const group_list = [];
    groups.map(group => group_list.push(group.value));
    setSubjectData({ ...subjectData, group: group_list });
  };

  const handleSelectedOptions = () => {
    const tempSelected = [];
    for (let option of groupOptions) {
      for (let id of subjectData.group) {
        if (option.value === id) {
          tempSelected.push(option);
        }
      }
    }
    return tempSelected;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    editSubject(subject_id, subjectData)
      .then(response => {
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

  const groupOptions =
    groups.length > 0
      ? groups.map(group => ({ label: group.name, value: group.id }))
      : [{ label: 'Пусто', value: undefined }];

  const selectedOptions = handleSelectedOptions();

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
            to='/subjects'
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
                value={subjectData.title}
                onChange={handleChangeTitle}
              ></input>
              <p>Опис</p>
              <textarea
                className='form-control'
                value={subjectData.description}
                onChange={handleChangeDescription}
              ></textarea>
              <p>Групи</p>
              <Select
                isMulti
                options={groupOptions}
                value={selectedOptions}
                onChange={handleGroupsSelected}
              />
              <button
                className={styles.customSubmitBtn + ' btn btn-primary'}
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

export default EditSubject;
