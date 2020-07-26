import React, { Component } from "react";
import { withFirebase } from "../firebase-config";
import BootstrapTable from "react-bootstrap-table-next";
import { TableCaption, STUDENT_COLUMS } from "../utilities/table";
import { STUDENT_CREATE } from "../constants/routes";
import { Loading } from "../components";

class StudentList extends Component {
  state = {
    students: [],
    isLoading: true,
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
        console.log("Students", docs);
        this.setState({ students: docs, isLoading: false });
      })
      .catch((errors) => {
        console.log("Error when fetching students collections", errors);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { students, isLoading } = this.state;
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
              to={STUDENT_CREATE}
            />
          }
          bordered={false}
          classes="table-sm table-responsive-xl"
        />
      </div>
    );
  }
}

export default withFirebase(StudentList);
