import React, {useContext} from 'react';
import styles from './buildList.module.css';
import { ItemListContext } from "./ItemListContext";


const Header = () => {
    const {newList, store} = useContext(ItemListContext);
    return (
        <div className={styles.header}>
            <h1>List Builder</h1>
            <button onClick={newList}>New List</button>
            <h2>{store ? store : "Select Store"}</h2>

        </div>
    )
}

export default Header