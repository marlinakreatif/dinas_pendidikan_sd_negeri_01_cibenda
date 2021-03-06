import React, { Component } from "react";
import { withFirebase } from "../../firebase-config";
import "./styles.css";
import { Modal } from "react-bootstrap";
import ShowInput from "../file-input/ShowInput";
import { MESSAGES } from "../../constants";

const DialogUploader = ({ show, handleClose, onChange, progress }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{"Unggah Photo Profile"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-style">
        <ShowInput onChange={onChange} progress={progress} />
      </Modal.Body>
    </Modal>
  );
};

// this props contain {uuid, url_pp, setBack}
class PhotoProfile extends Component {
  state = {
    show: false,
    progress: 1,
  };

  onFileChange = (event) => {
    let file = event.target.files[0],
      fileType = "url_pp",
      currentInstanceRef = this;
    const { firebase, uuid, updateStudent, index } = this.props;
    let storageRef = firebase.app.storage().ref();
    let studentFilesRef = storageRef.child(`${uuid}`);

    var uploadTask = studentFilesRef
      .child(`${fileType}-${file.name}`)
      .put(file);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        currentInstanceRef.setState({
          progress,
        });
      },
      function (error) {
        currentInstanceRef.setState({
          message: MESSAGES.UPLOAD_FAILED,
          notification: true,
        });
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          currentInstanceRef.setState({
            progress: 0,
            url_pp: { url: downloadURL, fileName: file.name },
          });
          firebase.student(uuid).update({
            [fileType]: { url: downloadURL, fileName: file.name },
          });
          updateStudent({ url: downloadURL, fileName: file.name }, index);
        });
      }
    );
  };
  render() {
    const { uuid, option, url_pp } = this.props;
    const { show, progress } = this.state;
    const styleOpt = option ? option : { width: "120px", height: "140px" };
    return (
      <div style={styleOpt} id={uuid}>
        {url_pp && <img src={url_pp.url} style={styleOpt} alt="pp" />}
        {!url_pp && (
          <div
            className="btn-upload-pp"
            style={{ ...styleOpt }}
            onClick={() => this.setState({ show: true })}
          >
            <i className="fa fa-plus "></i>
            <DialogUploader
              show={show}
              progress={progress}
              onChange={this.onFileChange}
            />
          </div>
        )}
      </div>
    );
  }
}
export default withFirebase(PhotoProfile);
