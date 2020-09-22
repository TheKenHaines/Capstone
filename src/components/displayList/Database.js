import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import Axios from "axios";
import AisleModal from "./AisleModal";
import styles from "./shoplist.module.css";
import cx from "classnames";
import FinishedButton from "./FinishedButton";
import TableContainer from "./TableContainer";

export default function Database(props) {
  const [data, setData] = useState([]);
       const location = useLocation();
       const store = location.state.store;

  


  useEffect(() => {
    (async () => {
      const result = await Axios(
        `http://localhost:8080/getItemsByStore?store=${store}`
      );
      setData(result.data);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Shop Chop Chop Database",
        columns: [
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
        ],
      },
    ],
    [data]
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
          <TableContainer columns={columns} data={data} />
        </div>
        <div className="row">
          <div className="col-6 offset-5">
            <FinishedButton />
          </div>
        </div>
      </div>
    </div>
  );
}
