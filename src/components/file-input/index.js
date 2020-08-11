import React, { Component } from "react";
import ShowFile from "./ShowFile";
import ShowInput from "./ShowInput";
import { withFirebase } from "../../firebase-config";
import { Dialog } from "../";
import {MESSAGES} from "../../constants";
import FileSaver from "file-saver";

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      confirmation: false,
      notification: false,
      viewer: false,
      message: null,
    };
  }
  onFileChange = (event) => {
    let currentInstanceRef = this;
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
    let currentInstanceRef = this;
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
        currentInstanceRef.setState({
          message: MESSAGES.DELETE_SUCCESS,
          notification: true,
          confirmation: false,
        });
        firebase.student(uuid).update({
          [fileType]: null,
        });
        setBack(null);
      })
      .catch(function (error) {
        currentInstanceRef.setState({
          message: MESSAGES.DELETE_FAILED,
          notification: true,
          confirmation: false,
        });
      });
  };

  onFileDownload = () => {
    const { defaultValue } = this.props;
    const currentInstanceRef = this;

    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var blob = xhr.response;
        currentInstanceRef.downloadToLocale(defaultValue.fileName, blob);
      }
    };

    xhr.open("GET", defaultValue.url);
    xhr.send();
  };

  downloadToLocale = (fileName, blob) => {
    FileSaver.saveAs(blob, fileName);
  };
  render() {
    const { defaultValue } = this.props;
    const {
      progress,
      confirmation,
      notification,
      message,
      viewer,
    } = this.state;
    return (
      <div>
        {defaultValue && (
          <ShowFile
            value={defaultValue}
            onDownload={this.onFileDownload}
            onDelete={() =>
              this.setState({
                confirmation: true,
                message: `${MESSAGES.CONFIRMATION_DELETE_FILE} ${defaultValue.fileName}`,
              })
            }
            onOpenViewer={() => this.setState({ viewer: true })}
          />
        )}
        {!defaultValue && (
          <ShowInput onChange={this.onFileChange} progress={progress} />
        )}
        <Dialog.Confirmation
          show={confirmation}
          message={message}
          handleClose={() => this.setState({ confirmation: false })}
          feedback={this.onFileDelete}
        />
        <Dialog.Notification
          show={notification}
          message={message}
          handleClose={() => this.setState({ notification: false })}
        />
        <Dialog.FileViewer
          show={viewer}
          message={defaultValue}
          handleClose={() => this.setState({ viewer: false })}
          download={this.onFileDownload}
          size="lg"
        />
      </div>
    );
  }
}

export default withFirebase(FileInput);
