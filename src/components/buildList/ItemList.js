import React, {useContext} from 'react';
import {ItemListContext} from './ItemListContext';
import Item from './Item';
import styles from './buildList.module.css';

const ItemList = () => {
    const {items} = useContext(ItemListContext);
    return (
        <div>
            {items.length ? (
            <ul className={styles.list}>
                    {items.map((item) => {
                        return <Item item={item} key={item.id}
                        />;
                })}
            </ul>
            ) : (
                <div className = {styles.noItems}>No Items</div>
            )}
        </div>
    );
};


export default ItemList;