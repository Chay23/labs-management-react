import styles from './Registration.module.scss';
import { useEffect, useState } from 'react';
import { getGroups, register, setToken } from './RegistrationService';
import Select from 'react-select';
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
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

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
      getGroups()
        .then(response => {
          setGroups(response.data);
        })
        .catch(error => {
          handleShowError(error);
        });
    }
    fetchGroups();
  }, []);

  const handleShowError = error => {
    if (error.response) {
      if (error.response.status === 400) {
        setAlert({
          message: error.response.data.details,
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

  const confirmPassword = () => {
    if (formData.password !== formData.passwordConfirm) {
      setAlert({
        message: 'Паролі не співпадають',
        type: 'danger',
      });
      return false;
    } else if (
      formData.password.length < 8 &&
      formData.passwordConfirm.length < 8
    ) {
      setAlert({
        message: 'Пароль повинен містити не менше 8 символі',
        type: 'danger',
      });
      return false;
    }
    return true;
  };

  const handleToken = async () => {
    setLoading(true);
    let data = {
      email: formData.email,
      password: formData.password,
    };
    setToken(data).catch(error => handleShowError(error));
  };

  const handleRegistration = async () => {
    setLoading(true);
    await register(formData)
      .then(() => {
        handleToken();
      })
      .catch(error => {
        handleShowError(error);
      });
    setLoading(false);
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
      {alert.message ? (
        <div className={'alert alert-' + alert.type} role='alert'>
          {alert.message}
        </div>
      ) : null}
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
