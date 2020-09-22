import React, {useContext} from 'react';
import styles from './buildList.module.css';
import cx from 'classnames';
import { ItemListContext } from './ItemListContext';



const Item = ({item}) => {
    const {removeItem, findItem, showModal,} = useContext(ItemListContext)

    
   
    return (
        <li className={styles.listItem}>
            <span>{item.title}</span>
            <div>
                
                <button onClick={()=> findItem(item.id)} className={cx(styles.btnDelete, styles.itemBtn) }> 
                <i className="fas fa-pen"></i>
                </button>
                <button onClick={()=> showModal(item.id)} className={cx(styles.btnDelete, styles.itemBtn) }> 
                <i className="fas fa-camera"></i>
                </button>
                <button onClick ={()=> removeItem(item.id)} 
                className={cx(styles.btnDelete, styles.itemBtn) }> 
                <i className="fas fa-trash"></i>
                </button>
            </div>
        </li>
    )
}

export default Item;