import React from 'react';
import { Link } from 'react-router-dom';
import styles from './shoplist.module.css'

const FinishedButton =() => {
    return (
        <Link to='/buildList'><button className={styles.finishBtn} type="button">Finished</button></Link>
    )
}

export default FinishedButton