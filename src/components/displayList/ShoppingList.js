import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import Axios from "axios";
import AisleModal from "./AisleModal";
import styles from "./shoplist.module.css";
import cx from "classnames";
import FinishedButton from './FinishedButton';
import TableContainer from './TableContainer';
import DatabaseButton from './DatabaseButton';

export default function ShoppingList(props) {
  const [data, setData] = useState([]);
  const location = useLocation();
  const email = location.state.email;
  const listID = location.state.listID;
  const store = location.state.store;
  localStorage.setItem("store", store);
  const [store2, setStore2] = useState(location.state.store)
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedRow, setSelectedRow]=useState({});
  const [editRow, setEditRow]=useState({});
  const [aisleupdate, setAisleupdate]=useState({});

  

  const handleShow = (selected) => {
    setSelectedRow(selected);
  }
  

  useEffect(() => {
    (async () => {
      const result = await Axios(
        `http://localhost:8080/getList?email=${email}&listID=${listID}`
      );
      setData(result.data);

    })();
  }, []);

  const handleEdit = (row) => {
    setModalShow(true);
    setEditRow(row)
   
  };

  const updateCell = (e) => {
    let record = editRow.data[editRow.cell.row.index]
    record[e.target.name] = e.target.value
    setAisleupdate(record)
    setStore2(record.store)
  }

  const updateAisle = (e) => {
    e.preventDefault()
    Axios.put(`http://localhost:8080/editAisle?id=${aisleupdate.id}&aisle=${aisleupdate.aisleLocation}`)
      .then(res => {
        Axios.get(`http://localhost:8080/getList?email=${email}&listID=${listID}`)
          .then(result => {
            setData(result.data);
          })
      })
      .catch(err => console.log(err))
  }
  
    

  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "Shop Chop Chop List",
        // First group columns
        columns: [
          {
            Header: "User",
            accessor: "email",
          },
          {
            Header: "Store",
            accessor: "store",
          },
        ],
      },
      {
        Header: "Details",
        columns: [
          {
            Header: "Item",
            accessor: "title",
          },
          {
            Header: "Picture",
            accessor: "picture",
            Cell: ({ row }) => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={row.original.picture}
              >
                {row.original.picture}
              </a>
            ),
          },
          {
            Header: "Aisle",
            accessor: "aisleLocation",
          },
          {
            Header: "Location",
            id: 'edit',
            accessor: 'id',
            Cell: (row) => (
              <div>
                <button
                  onClick={()=> {
                    handleEdit(row);
                  }}
                  className={styles.editBtn}
                >
                  Record Aisle
                </button>
              </div>
            ),
          },
          {
              Header: "Remove",
              id: "delete",
              accessor: (str) => "delete",

              Cell: (row)=> (
                  <button
                  className={styles.deleteBtn}
                  onClick={()=> {
                      const dataCopy = [...data];
                      dataCopy.splice(row.index, 1);
                      setData(dataCopy);
                  }}>
                  Found
                </button>

              )
               
          }
        ],
      },
    ],
    [data],
  );

  return (
    <div
      className={`${cx(
        styles.pageWrapper,
        styles.routeWrapper,
        styles.container
      )}`}
    >
        <div className="container">
            <div className="row">
                < TableContainer columns={columns} data={data} handleShow={handleShow} />
            </div>
            <div className="row">
                <div className="col-12 offset-4">
                <DatabaseButton store={store2} />
                <FinishedButton/>
                    
                </div>
            </div>
        </div>
      <AisleModal
        show={modalShow}
        updateAisle={(e) => updateAisle(e)}
        onChange={(e) => updateCell(e)}
        onHide={() => setModalShow(false)}
      />
      
    </div>
  );
}
