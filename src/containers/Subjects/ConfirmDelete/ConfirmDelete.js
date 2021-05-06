import styles from './ConfirmDelete.module.scss';
import { useState } from 'react/cjs/react.development';
import Modal from '../../../components/Modal/Modal';
import { deleteSubject } from './ConfirmDeleteService';

const ConfirmDelete = ({ show, modalClosed, setState }) => {
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

  const handleSubjectDelete = async () => {
    const subject_id = localStorage.getItem('subject_id');
    deleteSubject(subject_id)
      .then(() => {
        setState(prevState => prevState + 1);
        modalClosed();
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
      <div>
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
