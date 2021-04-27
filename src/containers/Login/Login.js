import styles from './Login.module.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from './LoginService';
import Spinner from '../../components/Spinner/Spinner';

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
  let history = useHistory();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleError = error => {
    if (error.response) {
      if (error.response.status === 400) {
        setAlert({
          message: 'Невірна електронна пошта або невірний пароль',
          type: 'danger',
        });
      }
    } else if (error.request) {
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
    login(data)
      .then(response => {
        setLoading(false);
        history.push('/subjects');
      })
      .catch(error => {
        setFormData({ ...formData, password: '' });
        handleError(error);
        setLoading(false);
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
          value={formData.email}
          onChange={handleChange}
          placeholder='Електронна пошта'
        />
        <input
          className='form-control'
          name='password'
          value={formData.password}
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
