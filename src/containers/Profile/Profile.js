import styles from './Profile.module.scss';
import { useEffect, useState } from 'react';
import { getUserData } from './ProfileService';
import UpdateProfile from './UpdateProfile';
import ChangePassword from './ChangePassword';
import Spinner from './../../components/Spinner/Spinner';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    group: '',
  });
  const [useUpdateModal, setShowUpdateModal] = useState(false);
  const [usePasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(0);
  const [alert, setShowAlert] = useState({
    message: '',
    type: '',
  });

  useEffect(() => {
    setLoading(true);
    getUserData()
      .then(data => {
        setProfileData({
          email: data.user.email,
          first_name: data.first_name,
          last_name: data.last_name,
          group: data.group.name,
        });
        setLoading(false);
      })
      .catch(() => {
        handleShowAlert();
        setLoading(false);
      });
  }, [state]);

  const handleShowAlert = () => {
    setShowAlert({
      message: 'Виникла помилка. Спробуйте пізніше',
      type: 'danger',
    });
  };

  const handleUpdateModalShow = () => {
    setShowUpdateModal(prevState => !prevState);
  };

  const handlePasswordChangeModalShow = () => {
    setShowPasswordChangeModal(prevState => !prevState);
  };

  const updateComponent = () => {
    setState(state => state + 1);
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
          <h2>Профіль</h2>
          <hr />
          <div className={styles.profileContent}>
            <p>Електронна скринька: {profileData.email}</p>
            <p>Ім'я: {profileData.first_name}</p>
            <p>Прізвище: {profileData.last_name}</p>
            <p>Група: {profileData.group}</p>
            <button
              className='btn btn-outline-success'
              onClick={handleUpdateModalShow}
            >
              Редагувати профіль
            </button>
            <button
              className='btn btn-outline-info'
              onClick={handlePasswordChangeModalShow}
            >
              Змінити пароль
            </button>
          </div>
          <UpdateProfile
            show={useUpdateModal}
            handleModalShow={handleUpdateModalShow}
            userData={profileData}
            updateComponent={updateComponent}
            onCancel={handleUpdateModalShow}
          />
          <ChangePassword
            show={usePasswordChangeModal}
            handleModalShow={handlePasswordChangeModalShow}
            onCancel={handlePasswordChangeModalShow}
          />
        </div>
      )}
    </>
  );
};

export default Profile;
