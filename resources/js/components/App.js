import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Tasks from './Tasks/Tasks';
import Task from './Tasks/Task/Task';
import Home from './Home/Home';
import Nav from './Partials/Nav';

export const URL = '/api/tasks';

const routes = [
    {
        component: Task,
        path: '/tasks/:task'
    },
    {
        component: Tasks,
        path: '/tasks'
    },
    {
        component: Home,
        path: '/'
    }
];

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Nav />
                    <div className="row">
                        <div className="col-sm-6">
                            {routes.map(route =>
                                <Route
                                    exact
                                    path={route.path}
                                    component={route.component}
                                    key={route.path} />
                            )}
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
