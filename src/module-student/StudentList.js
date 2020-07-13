import React, { Component } from 'react';
import { withFirebase } from "./../firebase-config";
import { Breadcrumb, Table } from "react-bootstrap";

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
                    docs.push({ ...doc.data(), id: doc.id })
                })
                console.log("DOCS", docs);
                this.setState({ students: docs })
            })
            .catch(errors => {
                console.log("Error when fetching students collections", errors);
            })
    }

    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Daftar Pengguna</Breadcrumb.Item>
                </Breadcrumb>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default withFirebase(StudentList);
