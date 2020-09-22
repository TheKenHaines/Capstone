import React, { createContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Axios from "axios";

export const ItemListContext = createContext();

const ItemListContextProvider = (props) => {
  const initialState = JSON.parse(localStorage.getItem("items")) || [];
  const initialListID = JSON.parse(localStorage.getItem("listID")) || [];

  const email = localStorage.getItem("loggedInUser");

  const [listID, setListID] = useState(initialListID);

  const [items, setItems] = useState(initialState);

  const [store, setStore] = useState("");


  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const [editItem, setEditItem] = useState(null);

  const addItem = (title) => {
    saveToDataBase(title);
  };

  const saveToDataBase = (title) => {
    let tempItem = {
      title: title,
      email: email,
      listID: listID,
      store: store,
    };
    Axios.post("http://localhost:8080/submitItem", tempItem).then(
      (response) => {
        setItems([...items, { title, id: response.data.id }]);
      }
    );
  };

  const removeItem = (id) => {
    Axios.post(`http://localhost:8080/delete?id=${id}`).then((response) => {
      setItems(items.filter((item) => item.id !== id));
    });
  };

  const clearList = () => {
    setItems([]);
  };

  const findItem = (id) => {
    const item = items.find((item) => item.id === id);

    setEditItem(item);
  };

  const changeItem = (title, id) => {
    Axios.put(`http://localhost:8080/editItem?title=${title}&id=${id}`)
    .then((respone)=> {
      const newItems = items.map((item) =>
      item.id === id ? { title, id } : item
    );
    setItems(newItems);
    setEditItem(null);
    })
    
  };

  const showModal = (id) => {
    props.showModal(id);
  };

  const showStoreModal = () => {
    props.showStoreModal();
  };

  const newList = () => {
    clearList();
    newListID();
  };

  const newListID = () => {
    let listID = uuid();
    setListID(listID);
    localStorage.setItem("listID", JSON.stringify(listID));
    showStoreModal();
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setStore(value);
  };
  


 

 

  return (
    <ItemListContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearList,
        findItem,
        changeItem,
        editItem,
        showModal,
        newList,
        showStoreModal,
        handleChange,
        store,
        email,
        listID,
      }}
    >
      {props.children}
    </ItemListContext.Provider>
  )
}

export default ItemListContextProvider;
