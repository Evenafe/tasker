import React, { Component } from 'react';
import axios from "axios";

import { URL } from '../App';

import Form from './Form/Form';
import List from './List/List';

class Tasks extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            checkedTasks: [],
            toggleTasks: true
        };

        this.select = this.select.bind(this);
        this.delete = this.delete.bind(this);
        this.complete = this.complete.bind(this);
        this.toggleTasks = this.toggleTasks.bind(this);
    }

    create(event) {
        event.preventDefault();

        const title = event.target.title.value;
        const body = event.target.body.value;

        axios.post(URL, { title, body })
            .then(response => console.log(response))
            .then(location.reload())
            .catch(error => console.log(error));
    }

    get() {
        axios.get(URL)
            .then(response => {
                const tasks = response.data;
                this.setState({ tasks });
            })
            .catch(error => console.log(error));
    }

    delete() {
        this.state.checkedTasks.map(task => {
            axios.delete(`${URL}/${task}`)
                .then(response => console.log(response))
                .then(location.reload())
                .catch(error => console.log(error));
        });
    }

    complete() {
        this.state.checkedTasks.map(task => {
            axios.put(`${URL}/${task}`, { completed: true })
                .then(response => console.log(response))
                .then(location.reload())
                .catch(error => console.log(error));
        })
    }

    select(event) {
        const { checked, id } = event.target;
        let checkedTasks;

        if (checked) {
            checkedTasks = [...this.state.checkedTasks, id];
            this.setState({ checkedTasks });
        } else {
            checkedTasks = this.state.checkedTasks.filter(task => task !== id);
            this.setState({ checkedTasks });
        }
    }

    toggleTasks(event, bool) {
        event.preventDefault();
        this.setState({ toggleTasks: bool, checkedTasks: [] });
    }

    componentWillMount() {
        this.get();
    }

    render() {
        let completedTaskButtons;
        let unCompletedTaskButtons;
        let taskTabs;

        if (this.state.checkedTasks.length > 0) {
            completedTaskButtons = <button className="btn btn-danger" onClick={this.delete}>Delete</button>;

            unCompletedTaskButtons = <span>
                <button className="btn btn-success" onClick={this.complete}>Mark as Complete</button>
                <button className="btn btn-danger" onClick={this.delete}>Delete</button>
            </span>;
        }

        if (this.state.tasks.length > 0) {
            taskTabs = <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a onClick={() => this.toggleTasks(event, true)} className={`nav-link ${this.state.toggleTasks ? 'active' : ''}`} href="#">Uncompleted Tasks</a>
                </li>
                <li className="nav-item">
                    <a onClick={() => this.toggleTasks(event, false)} className={`nav-link ${this.state.toggleTasks ? '' : 'active'}`} href="#">Completed Tasks</a>
                </li>
            </ul>
        }

        return(
            <div className="container">
                <Form onSubmit={this.create} />

                { taskTabs }

                <List tasks={this.state.tasks} select={this.select} toggleTasks={this.state.toggleTasks} />


                { this.state.toggleTasks ? unCompletedTaskButtons : completedTaskButtons }

            </div>
        );
    }
}

export default Tasks;