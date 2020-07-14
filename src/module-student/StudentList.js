import React, { Component } from 'react';
import { withFirebase } from "../firebase-config";
import BootstrapTable from "react-bootstrap-table-next";
import { TableCaption , STUDENT_COLUMS } from '../table-utilities'

class StudentList extends Component {
    state = {
        students: [],
        isLoading: true
    }
    componentDidMount() {
        const { firebase } = this.props;
        firebase.students()
            .get()
            .then(querySnapshots => {
                let docs = [];
                querySnapshots.forEach(doc => {

                    docs.push({ uuid: doc.id, ...doc.data() });
                })
                console.log('Students', docs);
                this.setState({ students: docs })
            })
            .catch(errors => {
                console.log("Error when fetching students collections", errors);
            })
    }

    render() {
        const { students } = this.state;
        return (
            <div>
                
                <BootstrapTable
                    keyField='uuid'
                    data={students}
                    columns={STUDENT_COLUMS}
                    bootstrap4
                    condensed
                    caption={
                        <TableCaption icon="fa-users" title="Daftar Siswa/Siswi" />
                    }
                    classes="table-sm" />
            </div>
        )
    }
}

export default withFirebase(StudentList);
