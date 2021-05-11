import styles from './CreateSubject.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { createSubject, getGroups, getUserId } from './CreateSubjectService';
import Spinner from '../../../components/Spinner/Spinner';

const CreateSubject = () => {
  const [groups, setGroups] = useState([]);
  const [subjectData, setSubjectData] = useState({
    title: '',
    description: '',
    created_by: null,
    group: [],
  });
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleGetGroups = () => {
      getGroups()
        .then(response => {
          setGroups(response.data);
          setLoading(false);
        })
        .catch(error => handleShowErrorAlert(error));
    };
    setLoading(true);
    handleGetGroups();
  }, []);

  const handleChange = e => {
    setSubjectData({ ...subjectData, [e.target.name]: e.target.value });
  };

  const handleGroupsSelected = groups => {
    const group_list = [];
    groups.map(group => group_list.push(group.value));
    setSubjectData({ ...subjectData, group: group_list });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const user_id = getUserId();
    let data = {
      title: subjectData.title,
      description: subjectData.description,
      created_by: user_id,
      group: subjectData.group,
    };
    setLoading(true);
    createSubject(data)
      .then(response => {
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
      let response = JSON.parse(error.response.request.response)
        .non_field_errors;
      if (response !== undefined) {
        setAlert({
          message: response,
          type: 'danger',
        });
      } else {
        setAlert({
          message: 'Невірно введені дані',
          type: 'danger',
        });
      }
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
      : null;

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
          <h3>Створити новий предмет</h3>
          <hr />
          <div className={styles.formSection}>
            <form onSubmit={handleSubmit}>
              <p>Назва предмету</p>
              <input
                className='form-control'
                value={subjectData.title}
                onChange={handleChange}
                name='title'
              ></input>
              <p>Опис предмету (512 символів)</p>
              <textarea
                className='form-control'
                value={subjectData.description}
                onChange={handleChange}
                name='description'
                maxLength={512}
              ></textarea>
              <p>Групи</p>
              <Select
                isMulti
                options={groupOptions}
                onChange={handleGroupsSelected}
                placeholder='Пошук груп'
              />
              <button
                className={styles.customSubmitBtn + ' btn btn-outline-dark'}
              >
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
      )}
    </>
  );
};

export default CreateSubject;
