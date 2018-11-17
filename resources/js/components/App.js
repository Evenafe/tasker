import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Tasks from './Tasks/Tasks';
import Task from './Tasks/Task/Task';
import Home from './Home/Home';

export const URL = '/api/tasks';

const routes = [
    {
        component: Task,
        path: '/tasks/:task'
    },
    {
        component: Home,
        path: '/',
        name: 'Home'
    },
    {
        component: Tasks,
        path: '/tasks',
        name: 'Tasks'
    }
];

class App extends Component {
    render() {
        const filteredRoutes = routes.filter(route => route.path !== '/tasks/:task');
        return (
            <Router>
                <div className="container">
                    <ul className="nav nav-tabs">
                        {filteredRoutes.map(route =>
                            <li className="nav-item">
                                <Link
                                    to={route.path}
                                    className="nav-link">
                                        {route.name}
                                </Link>
                            </li>
                        )}
                    </ul>
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
