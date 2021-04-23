import styles from './Login.module.scss';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../config';
import Spinner from '../../components/Spinner/Spinner';
import customAxios from '../../customAxios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [show, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserId = async () => {
    customAxios.get('/auth/users/me').then(response => {
      let id = response.data.id;
      document.cookie = `user_id=${id}; path=/`;
    });
  };

  const handleError = status => {
    if (status === 400) {
      setAlert({
        message: 'Невірна електронна пошта або невірний пароль',
        type: 'danger',
      });
    } else {
      setAlert({
        message: 'Виникла помилка. Спробуйте пізніше',
        type: 'danger',
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    let data = {
      email: formData.email,
      password: formData.password,
    };
    await axios
      .post(baseUrl + '/auth/token/login/', data)
      .then(response => {
        const token = response.data.auth_token;
        document.cookie = `token=${token}; path=/`;
        handleUserId();
        setLoading(false);
        <Redirect to='/profile' />;
      })
      .catch(error => {
        setLoading(false);
        setFormData({ ...formData, password: '' });
        handleError(error.response.status);
      });
  };

  const handlePasswordShow = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className={styles.content}>
      {alert.message ? (
        <div className={'alert alert-' + alert.type} role='alert'>
          {alert.message}
        </div>
      ) : null}
      <h1>Вхід</h1>
      <form onSubmit={handleSubmit}>
        <input
          className='form-control'
          name='email'
          onChange={handleChange}
          placeholder='Електронна пошта'
        />
        <input
          className='form-control'
          name='password'
          type={show ? 'text' : 'password'}
          onChange={handleChange}
          placeholder='Пароль'
        />
        <div className={styles.show}>
          <label>
            Показати пароль
            <input
              type='checkbox'
              className='form-check-input'
              onClick={handlePasswordShow}
              id='checkbox'
            />
          </label>
        </div>
        <button className={styles.customButton + ' btn btn-outline-dark'}>
          Увійти
        </button>
        {loading ? <Spinner /> : null}
      </form>
    </div>
  );
};

export default Login;
