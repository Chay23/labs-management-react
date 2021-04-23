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

  useEffect(() => {
    setLoading(true);
    getUserData().then(data => {
      setProfileData({
        email: data.user.email,
        first_name: data.first_name,
        last_name: data.last_name,
        group: data.group.name,
      });
      setLoading(false);
    });
  }, [state]);

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
    <div className={styles.content}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <p>Електронна скринька: {profileData.email}</p>
          <p>Ім'я: {profileData.first_name}</p>
          <p>Прізвище: {profileData.last_name}</p>
          <p>Група: {profileData.group}</p>
          <button
            className='btn btn-outline-dark'
            onClick={handleUpdateModalShow}
          >
            Редагувати профіль
          </button>
          <button
            className='btn btn-outline-dark'
            onClick={handlePasswordChangeModalShow}
          >
            Змінити пароль
          </button>
        </>
      )}
      <UpdateProfile
        show={useUpdateModal}
        handleModalShow={handleUpdateModalShow}
        userData={profileData}
        updateComponent={updateComponent}
      />
      <ChangePassword
        show={usePasswordChangeModal}
        handleModalShow={handlePasswordChangeModalShow}
        onCancel={handlePasswordChangeModalShow}
      />
    </div>
  );
};

export default Profile;
