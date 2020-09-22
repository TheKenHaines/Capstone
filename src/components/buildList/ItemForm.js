import React, { useState, useContext, useEffect } from "react";
import cx from "classnames";
import styles from "./buildList.module.css";
import { ItemListContext } from "./ItemListContext";



const ItemForm = () => {
  
 

  const { addItem, clearList, editItem, changeItem } = useContext(
    ItemListContext
  );

  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editItem) {
      addItem(title);
      setTitle("");
    } else {
      changeItem(title, editItem.id);
    }
  };

  
  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
    } else {
      setTitle("");
    }
  }, [editItem]);


  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        onChange={handleChange}
        value={title}
        type="text"
        className={styles.itemInput}
        placeholder="Add Item"
        required
      />
      <div className={styles.buttons}>
        <button type="submit" className={cx(styles.btn, styles.addItemBtn)}>
          {editItem ? "Edit Item" : "Add Item"}
        </button>
        <button onClick={clearList} className={cx(styles.btn, styles.clearBtn)}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
