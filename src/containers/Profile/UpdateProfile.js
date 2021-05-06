import styles from './Profile.module.scss';
import { useEffect, useState } from 'react';
import { updateUserData } from './ProfileService';
import Modal from '../../components/Modal/Modal';

const UpdateProfile = props => {
  const [updateData, setUpdateData] = useState({
    first_name: props.userData.first_name,
    last_name: props.userData.last_name,
  });
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

  useEffect(() => setUpdateData(props.userData), [props.userData, alert]);

  const handleChange = e => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleError = status => {
    if (status === 400) {
      setAlert({ message: 'Введено невірні дані', type: 'danger' });
    } else {
      setAlert({ message: 'Виникла помилка', type: 'danger' });
    }
  };

  const handleUserUpdate = e => {
    e.preventDefault();
    updateUserData(updateData)
      .then(response => {
        props.updateComponent();
        setAlert({ message: 'Успішно відредаговано', type: 'success' });
      })
      .catch(error => {
        handleError(error.response.status);
      });
  };

  const flushData = () => {
    setAlert({ message: '', type: '' });
  };

  return (
    <Modal
      show={props.show}
      modalClosed={() => {
        props.handleModalShow();
        flushData();
      }}
    >
      <div className={styles.updateContent}>
        {alert.message ? (
          <div className={'alert alert-' + alert.type} role='alert'>
            {alert.message}
          </div>
        ) : null}
        <h2>Редагування профілю</h2>
        <p>Ім'я</p>
        <input
          className='form-control'
          value={updateData.first_name}
          name='first_name'
          onChange={handleChange}
        ></input>
        <p>Прізвище</p>
        <input
          className='form-control'
          value={updateData.last_name}
          name='last_name'
          onChange={handleChange}
        ></input>
        <button className='btn btn-success' onClick={handleUserUpdate}>
          Редагувати
        </button>
        <button className='btn btn-primary' onClick={props.onCancel}>
          Скасувати
        </button>
      </div>
    </Modal>
  );
};

export default UpdateProfile;
