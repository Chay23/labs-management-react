import styles from './Spinner.module.css';

const Spinner = ({height=11, width=11}) => <div className={styles.loader} style={{height: height+'em', width: width+'em'}}></div>;

export default Spinner;