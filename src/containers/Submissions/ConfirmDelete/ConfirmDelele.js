import styles from './ConfirmDelete.module.scss';
import { useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import { deleteAssignment } from './ConfirmDeleteService';

const ConfirmDelete = ({ show, modalClosed, setState }) => {
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

  const handleSubjectDelete = async () => {
    const submission_id = localStorage.getItem('submission_id');
    deleteAssignment(submission_id)
      .then(() => {
        setState(prevState => prevState + 1);
        modalClosed();
        localStorage.removeItem('submission_id');
      })
      .catch(() => {
        handleShowErrorAlert();
      });
  };

  const handleShowErrorAlert = () => {
    setAlert({
      message: 'Виникла помилка.Спробуйте пізніше',
      type: 'danger',
    });
  };

  return (
    <Modal show={show} modalClosed={modalClosed}>
      <div className={styles.content}>
        {alert ? (
          <div className={'alert alert-' + alert.type} role='alert'>
            {alert.message}
          </div>
        ) : null}
        <h2>Ви впевнені?</h2>
        <hr />
        <button
          className={styles.customBtn + ' btn btn-danger'}
          onClick={handleSubjectDelete}
        >
          Так
        </button>
        <button className={'btn btn-primary'} onClick={modalClosed}>
          Ні
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
