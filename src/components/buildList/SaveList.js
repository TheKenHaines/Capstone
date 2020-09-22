import React, { useContext } from 'react';
import styles from './buildList.module.css'
import { Link } from 'react-router-dom';
import { ItemListContext } from './ItemListContext';


const SaveList = () => {
    const {email, listID, store } = useContext(ItemListContext)

    
    const clearHistory = () => {
        localStorage.removeItem("items");
        localStorage.removeItem("listID");
    }

    return (
          <Link className="nav-link" to={{
              pathname: "/ShoppingList",
              state: {
                  email: email,
                  listID: listID,
                  store: store

              }
              }}>
              <button onClick={clearHistory} className={styles.saveButton}>Finalize List</button></Link>
    )
}

export default SaveList