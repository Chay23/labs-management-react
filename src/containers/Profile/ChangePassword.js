import styles from './Profile.module.scss';
import { useState } from 'react';
import { changePassword } from './ProfileService';
import Modal from '../../components/Modal/Modal';

const ChangePassword = props => {
  const [passswordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirm: '',
  });
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

  const handleChange = e => {
    setPasswordData({ ...passswordData, [e.target.name]: e.target.value });
  };

  const passwordValidation = () => {
    if (passswordData.new_password !== passswordData.new_password_confirm) {
      setAlert({ message: 'Паролі не співпадають', type: 'danger' });
      return false;
    } else if (passswordData.new_password.length < 8) {
      setAlert({
        message: 'Пароль повинен містити не менше 8 символів',
        type: 'danger',
      });
      return false;
    }
    return true;
  };

  const handlePasswordChange = () => {
    if (passwordValidation()) {
      let data = {
        current_password: passswordData.current_password,
        new_password: passswordData.new_password,
      };
      changePassword(data)
        .then(response => {
          setAlert({ message: 'Успішно змінено', type: 'success' });
          flushData();
        })
        .catch(error => {
          setAlert({
            message: 'Виникла помилка при зміні паролю, повторіть пізніше',
            type: 'danger',
          });
          setPasswordData(prevData => ({
            current_password: prevData.current_password,
            new_password: '',
            new_password_confirm: '',
          }));
        });
    }
  };

  const flushData = () => {
    setPasswordData({
      current_password: '',
      new_password: '',
      new_password_confirm: '',
    });
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
      <div className={styles.changePasswordContent}>
        {alert.message ? (
          <div className={'alert alert-' + alert.type} role='alert'>
            {alert.message}
          </div>
        ) : null}
        <h2>Зміна паролю</h2>
        <p>Поточний пароль</p>
        <input
          type='password'
          className='form-control'
          name='current_password'
          onChange={handleChange}
        ></input>
        <p>Новий пароль</p>
        <input
          type='password'
          className='form-control'
          name='new_password'
          onChange={handleChange}
        ></input>
        <p>Підтвердження нового паролю</p>
        <input
          type='password'
          className='form-control'
          name='new_password_confirm'
          onChange={handleChange}
        ></input>
        <button className='btn btn-success' onClick={handlePasswordChange}>
          Підтвердити
        </button>
        <button
          className='btn btn-primary'
          onClick={() => {
            props.onCancel();
            flushData();
          }}
        >
          Скасувати
        </button>
      </div>
    </Modal>
  );
};

export default ChangePassword;
