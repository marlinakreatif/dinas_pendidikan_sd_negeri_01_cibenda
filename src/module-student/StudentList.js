import React, { Component } from "react";
import { withFirebase } from "../firebase-config";
import BootstrapTable from "react-bootstrap-table-next";
import { TableCaption, STUDENT_COLUMS } from "../utilities/table";
import { ROUTES } from "../constants";
import { Loading, Dialog } from "../components";

class StudentList extends Component {
  state = {
    students: [],
    isLoading: true,
    show: false,
    message: "",
  };
  componentDidMount() {
    const { firebase } = this.props;
    firebase
      .students()
      .get()
      .then((querySnapshots) => {
        let docs = [];
        querySnapshots.forEach((doc) => {
          docs.push({ uuid: doc.id, ...doc.data() });
        });
        this.setState({ students: docs, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false, message: error, show: true });
      });
  }

  render() {
    const { students, isLoading, show, message } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="content-layout">
        <BootstrapTable
          keyField="uuid"
          data={students}
          columns={STUDENT_COLUMS}
          bootstrap4
          caption={
            <TableCaption
              icon="fa-users"
              title="Daftar Siswa/Siswi"
              to={ROUTES.STUDENT_CREATE}
            />
          }
          bordered={false}
          classes="table-sm table-responsive-xl"
        />
        <Dialog.Notification
          show={show}
          message={message}
          handleClose={() => this.setState({ show: false })}
          size="sm"
        />
      </div>
    );
  }
}

export default withFirebase(StudentList);
