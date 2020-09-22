import React from "react";
import styles from "./buildList.module.css";
import ItemList from "./ItemList";
import ItemListContextProvider from "./ItemListContext";
import ItemForm from "./ItemForm";
import Header from "./listheader";
import AddPicModal from "./PictureModal";
import SaveList from './SaveList';
import StoreModal from './StoreModal';


class BuildList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      open: false,
      isList: false,
      selectedItem: ''
    };
  }

  showModal = (id) => {
    this.setState({
      isOpen: true,
      selectedItem: id
    });
  };

  hideModal = () => {
    this.setState({
      isOpen: false,
    });
  };

  showStoreModal = () => {
    this.setState({
      open: true,
    });
  };

  hideModal2 = () => {
    this.setState({
      open: false,
    })
  }

  changeIsList = () => {
    this.setState({
      isList: true
    })
  }


  render() {
    return (
      <ItemListContextProvider showModal={this.showModal} showStoreModal={this.showStoreModal}>
        <div className={styles.container}>
          <div className={styles.appWrapper}>
            <Header />

            <div className={styles.main}>
              <ItemForm />
              <ItemList />
               <SaveList/>
              
            </div>
           
            <AddPicModal
              itemId = {this.state.selectedItem}
              animation="true"
              show={this.state.isOpen}
              onHide={this.hideModal}
            />
            <StoreModal
            animation="true"
            show={this.state.open}
            onHide={this.hideModal2}
            />
            
          </div>
        </div>
      </ItemListContextProvider>
    );
  }
}

export default BuildList;
