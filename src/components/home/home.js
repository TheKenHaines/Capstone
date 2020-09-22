import React from 'react';
import styles from './home.module.scss';

const Home = (props) => {
        setTimeout(() => {
            props.history.push('/Login')
        }, 6700)
        return (
            <div className={styles.homeContainer}>
                <div className={styles.box}>
                    <div className={styles.title}>
                        <span className={styles.block}></span>
                        <h1>Shop Chop Chop<span></span></h1>
                    </div>

                    <div className={styles.role}>
                        <div className={styles.block}></div>
                        <p>Making Shopping Better</p>
                    </div>

                    <div className={styles.role}>
                        <div className={styles.block2}></div>
                        <div className={styles.h}><h3>by Kenneth Haines</h3></div>
                    </div>
                </div> 

            </div>
           
        
            

          
        );
    }


export default Home;