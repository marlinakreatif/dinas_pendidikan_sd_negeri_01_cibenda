import React, { Component } from 'react';
import { Breadcrumb, Table } from 'react-bootstrap';
import { withFirebase } from './../firebase-config';

class UserList extends Component {
    

    componentDidMount() {
        this.props.firebase.users()
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
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

export default withFirebase(UserList);
