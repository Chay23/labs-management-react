import styles from './Registration.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import customAxios from '../../customAxios';
import { baseUrl } from '../../config';
import Spinner from '../../components/Spinner/Spinner';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    first_name: '',
    last_name: '',
    group: undefined,
  });
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGroupSelected = e => {
    if (e !== null) {
      setFormData({ ...formData, group: e.value });
    } else {
      setFormData({ ...formData, group: undefined });
    }
  };

  useEffect(() => {
    async function fetchGroups() {
      await customAxios.get('/groups/group-list').then(response => {
        setGroups(response.data);
      });
    }
    fetchGroups();
  }, []);

  const confirmPassword = () => {
    return formData.password === formData.passwordConfirm;
  };

  const handleToken = async () => {
    setLoading(true);
    let data = {
      email: formData.email,
      password: formData.password,
    };
    await axios.post(baseUrl + '/auth/token/login/', data).then(response => {
      const token = response.data.auth_token;
      document.cookie = `token=${token}; path=/`;
      setLoading(false);
      
    });
  };

  const handleRegistration = async () => {
    setLoading(true);
    await axios.post(baseUrl + '/create-profile/', formData).then(() => {
      handleToken();
      setLoading(false);
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (confirmPassword()) {
      handleRegistration();
    } else {
    }
  };

  const options =
    groups.length > 0
      ? groups.map(group => ({ label: group.name, value: group.id }))
      : null;

  return (
    <div className={styles.content}>
      <h1>Реєстрація</h1>
      <form onSubmit={handleSubmit}>
        <p>Електронна пошта</p>
        <input className='form-control' name='email' onChange={handleChange} />
        <p>Пароль</p>
        <input
          className='form-control'
          type='password'
          name='password'
          onChange={handleChange}
        />
        <p>Підтвердження паролю</p>
        <input
          className='form-control'
          type='password'
          name='passwordConfirm'
          onChange={handleChange}
        />
        <p>Ім'я</p>
        <input
          className='form-control'
          name='first_name'
          onChange={handleChange}
        />
        <p>Прізвище</p>
        <input
          className='form-control'
          name='last_name'
          onChange={handleChange}
        />
        <p>Група</p>
        <Select
          options={options}
          className={styles.select}
          name='group'
          onChange={handleGroupSelected}
          placeholder='Введіть назву групи'
          isClearable={true}
        />
        <button className={styles.customButton + ' btn btn-outline-dark'}>
          Зареєструватися
        </button>
        {loading ? <Spinner /> : null}
      </form>
    </div>
  );
};

export default Registration;
