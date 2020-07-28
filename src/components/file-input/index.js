import React, { Component } from "react";
import ShowFile from "./ShowFile";
import ShowInput from "./ShowInput";
import { withFirebase } from "../../firebase-config";
import { Dialog } from "../";
import * as MESSAGE from "../../constants/message";

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      confirmation: false,
      notification: false,
      message: null,
    };
  }
  onFileChange = (event) => {
    let currentStateRef = this;
    let file = event.target.files[0];
    const { firebase, fileType, uuid, setBack } = this.props;
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
        currentStateRef.setState({
          progress,
        });
      },
      function (error) {
        currentStateRef.setState({
          message: MESSAGE.UPLOAD_FAILED,
          notification: true,
        });
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          currentStateRef.setState({
            progress: 0,
          });
          firebase.student(uuid).update({
            [fileType]: { url: downloadURL, fileName: file.name },
          });
          setBack({ url: downloadURL, fileName: file.name });
        });
      }
    );
  };

  onFileDelete = () => {
    let currentStateRef = this;
    const { firebase, defaultValue, fileType, uuid, setBack } = this.props;
    let storageRef = firebase.app.storage().ref();
    let studentFilesRef = storageRef.child(`${uuid}`);

    let delteFileRef = studentFilesRef.child(
      `${fileType}-${defaultValue.fileName}`
    );
    // Delete the file
    delteFileRef
      .delete()
      .then(function () {
        currentStateRef.setState({
          message: MESSAGE.DELETE_SUCCESS,
          notification: true,
          confirmation: false,
        });
        firebase.student(uuid).update({
          [fileType]: null,
        });
        setBack(null);
      })
      .catch(function (error) {
        currentStateRef.setState({
          message: MESSAGE.DELETE_FAILED,
          notification: true,
          confirmation: false,
        });
      });
  };
  render() {
    const { defaultValue } = this.props;
    const { progress, confirmation, notification, message } = this.state;
    return (
      <div>
        {defaultValue && (
          <ShowFile
            value={defaultValue}
            onDelete={() =>
              this.setState({
                confirmation: true,
                message: `${MESSAGE.CONFIRMATION_DELETE_FILE} ${defaultValue.fileName}`,
              })
            }
          />
        )}
        {!defaultValue && (
          <ShowInput onChange={this.onFileChange} progress={progress} />
        )}
        <Dialog.Confirmation
          show={confirmation}
          message={message}
          handleClose={() => this.setState({ confirmation: false })}
          doTask={this.onFileDelete}
        />
        <Dialog.Notification
          show={notification}
          message={message}
          handleClose={() => this.setState({ notification: false })}
        />
      </div>
    );
  }
}

export default withFirebase(FileInput);
