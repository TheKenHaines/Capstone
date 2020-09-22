import styles from "./dropzone.module.css";
import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

const DropZone = (props) => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);

  const modalImageRef = useRef();
  const modalRef = useRef();
  const fileInputRef = useRef();
  const uploadModalRef = useRef();
  const uploadRef = useRef();
  const progressRef = useRef();

  useEffect(() => {
    let filteredArr = selectedFiles.reduce((acc, current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setValidFiles([...filteredArr]);
  }, [selectedFiles]);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        files[i]["invalid"] = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage("File type not permitted");
        setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
  };

  const fileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };

  const removeFile = (name) => {
    const index = validFiles.findIndex((e) => e.name === name);
    const index2 = selectedFiles.findIndex((e) => e.name === name);
    const index3 = unsupportedFiles.findIndex((e) => e.name === name);
    validFiles.splice(index, 1);
    selectedFiles.splice(index2, 1);
    setValidFiles([...validFiles]);
    setSelectedFiles([...selectedFiles]);
    if (index3 !== -1) {
      unsupportedFiles.splice(index3, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };

  const openImageModal = (file) => {
    const reader = new FileReader();
    modalRef.current.style.display = "block";
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
    };
  };

  const closeModal = () => {
    modalRef.current.style.display = "none";
    modalImageRef.current.style.backgroundImage = "none";
  };

  const closeUploadModal = () => {
    uploadModalRef.current.style.display = "none";
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

    const uploadFiles = async (item) => {
    uploadModalRef.current.style.display = "block";
    uploadRef.current.innerHTML = "File(s) Uploading...";
    for (let i = 0; i < validFiles.length; i++) {
      const formData = new FormData();
      formData.append("image", validFiles[i]);
      formData.append("key", "963cd8f0923b8c560744cb1d66d794d5");

      Axios
        .post("https://api.imgbb.com/1/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const uploadPercentage = Math.floor(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            progressRef.current.innerHTML = `${uploadPercentage}%`;
            progressRef.current.style.width = `${uploadPercentage}%`;

            if (uploadPercentage === 100) {
              uploadRef.current.innerHTML = "File(s) Uploaded";
              validFiles.length = 0;
              setValidFiles([...validFiles]);
              setSelectedFiles([...validFiles]);
              setUnsupportedFiles([...validFiles]);
            }
          },
        })
        .then((res) => {
          console.log(res);
          console.log(props);
          Axios.post(`http://localhost:8080/setPicture`,{id: props.itemId, picture: res.data.data.url})
        })  
        .catch((error) => {
          console.log(error);
          uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
          progressRef.current.style.backgroundColor = "red";
        });
    }
  };


  return (
    <div>
      {unsupportedFiles.length === 0 && validFiles.length ? (
        <button className={styles.fileUploadBtn} onClick={() => uploadFiles()}>
          Upload Files
        </button>
      ) : (
        ""
      )}
      {unsupportedFiles.length ? (
        <p>Please remove all unsupported files.</p>
      ) : (
        ""
      )}{" "}
      <div className={styles.container}>
        <div className={styles.modal} ref={modalRef}>
          <div className={styles.overlay}></div>
          <span className={styles.close}>X</span>
          <div
            className={styles.modalImage}
            ref={modalImageRef}
            onClick={() => closeModal()}
          ></div>
        </div>
        <div
          className={styles.dropContainer}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          onClick={fileInputClicked}
        >
          <div className={styles.dropMessage}>
            <div className={styles.icon}></div>
            <i className="fa fa-download" aria-hidden="true"></i>
            Drag and Drop Files Here Or Click To Upload
          </div>
          <input
            ref={fileInputRef}
            className={styles.fileInput}
            type="file"
            multiple
            onChange={filesSelected}
          />
        </div>
        <div className={styles.fileDisplayContainer}>
          {validFiles.map((data, i) => (
            <div className={styles.fileStatusBar} key={i}>
              <div
                onClick={
                  !data.invalid
                    ? () => openImageModal(data)
                    : () => removeFile(data.name)
                }
              >
                <div className={styles.fileTypeLogo}></div>
                <div className={styles.fileType}>{fileType(data.name)}</div>
                <span
                  className={`${styles.fileName} ${
                    data.invalid ? "file-error" : ""
                  } `}
                >
                  {data.name}
                </span>
                <span className={styles.fileSize}>({fileSize(data.size)})</span>{" "}
                {
                  <span className={styles.fileErrorMessage}>
                    ({errorMessage})
                  </span>
                }
              </div>
              <div
                className={styles.fileRemove}
                onClick={() => removeFile(data.name)}
              >
                X
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.uploadModal} ref={uploadModalRef}>
        <div className={styles.overlay}></div>
        <div className={styles.close} onClick={() => closeUploadModal()}>
          X
        </div>
        <div className={styles.progressContainer}>
          <span ref={uploadRef}></span>
          <div className={styles.progress}>
            <div className={styles.progressBar} ref={progressRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
