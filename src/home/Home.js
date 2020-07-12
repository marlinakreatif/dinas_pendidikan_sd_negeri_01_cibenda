import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Dashboard from './Dashboard'
import { UserList, UserCreateOrUpdate  } from './../module-user'

export default function Home(props) {
    return (
        <Container>

            <div className="content-body">
                <Route path='/dashboard/' exact component={Dashboard} />
                <Route
                    path={`/dashboard/user`}
                    render={({ match: { url } }) => (
                        <>
                            <Route path={`${url}/`} component={UserList} exact />
                            <Route
                                path={`${url}/:user_id`}
                                component={UserCreateOrUpdate}
                            />
                        </>
                    )}
                />
            </div>
        </Container>
    )
}
