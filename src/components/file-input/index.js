import React, { Component } from "react";
import { Form, Row, Col, Button, ProgressBar } from "react-bootstrap";
import { withFirebase } from "../../firebase-config";

const ShowUrlText = ({ value, onDelete }) => {
  return (
    <Row>
      <Col sm={11}>
        <Form.Control
          size="sm"
          type="text"
          readOnly={true}
          defaultValue={value}
        />
      </Col>
      <Col sm={1}>
        <Button type="button" onClick={onDelete}>
          <i className="fa fa-trash"></i>
        </Button>
      </Col>
    </Row>
  );
};

const ShowInputFile = ({ onChange, progress }) => {
  return (
    <Row>
      <Col sm={12}>
        <Form.File
          size="sm"
          data-browse="Pilih Dokument"
          onChange={onChange}
          accept="application/pdf,image/*"
        />
      </Col>
      {progress > 0 && (
        <Col sm={12}>
          <ProgressBar
            now={progress}
            style={{ height: "5px", marginTop: "5px" }}
          />
        </Col>
      )}
    </Row>
  );
};

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
  }
  onFileChange = (event) => {
    const { firebase, fileType } = this.props;
    let file = event.target.files[0];

    var uploadTask = firebase.storageRef
      .child(`${fileType}/${file.name}`)
      .put(file);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          progress,
        });
      },
      function (error) {
        // Handle unsuccessful uploads
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  onFileDelete = () => {};
  render() {
    const { defaultValue } = this.props;
    const { progress } = this.state;
    return (
      <div>
        {defaultValue && (
          <ShowUrlText value={defaultValue} onDelete={this.onFileChange} />
        )}
        {!defaultValue && (
          <ShowInputFile onChange={this.onFileChange} progress={progress} />
        )}
      </div>
    );
  }
}

export default withFirebase(FileInput);
