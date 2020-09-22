import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./shoplist.module.css";
import { useLocation } from "react-router";


const DatabaseButton = (props) => {
     const location = useLocation();
     const store = location.state.store;
     

    

     return (
          <Link 
                className="nav-link" to={{
              pathname: "/Database",
              state: {
                  store: store
              }
              }}>
              <button  className={styles.dbBtn}>Search Database</button></Link>
    )

}

export default DatabaseButton