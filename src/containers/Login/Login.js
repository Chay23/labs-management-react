import styles from './Login.module.scss';
import { useState } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../config';
import Spinner from '../../components/Spinner/Spinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [show, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        setLoading(false);
        const token = response.data.auth_token;
        document.cookie = `token=${token}; path=/`;
        <Redirect to='/profile'/>
      })
      .catch(error => {
        setLoading(false);
        setFormData({ ...formData, password: '' });
      });
  };

  const handlePasswordShow = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className={styles.content}>
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
