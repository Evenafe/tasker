import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

import { URL } from '../App';

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

    create() {
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

    toggleTasks(event) {
        event.preventDefault();
        this.setState({ toggleTasks: !this.state.toggleTasks, checkedTasks: [] });
    }

    componentWillMount() {
        this.get();
    }

    render() {
        const tasks = this.state.tasks.map(task => {
            const taskList = <li className={'list-group-item'} key={task.id}>
                                <input id={task.id} onChange={this.select} className="task-checkbox" type="checkbox"/>
                                <Link
                                    to={`/tasks/${task.id}`}
                                    className={'list-group-item list-group-item-action'}>
                                    {task.title}
                                </Link>
                            </li>;

            if (!task.completed && this.state.toggleTasks) {
                return taskList;
            } else if (task.completed && !this.state.toggleTasks) {
                return taskList;
            }
        });

        let completedTaskButtons;
        let unCompletedTaskButtons;

        if (this.state.checkedTasks.length > 0) {
            completedTaskButtons = <button className="btn btn-danger" onClick={this.delete}>Delete</button>;
            
            unCompletedTaskButtons = <span>
                <button className="btn btn-success" onClick={this.complete}>Mark as Complete</button>
                <button className="btn btn-danger" onClick={this.delete}>Delete</button>
            </span>;
        }


        return(
            <div className="container">
                <form onSubmit={this.create}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input name="title" type="text" className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="body">Body:</label>
                        <textarea name="body" type="text" className="form-control"/>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>

                    {this.state.toggleTasks ? (
                        unCompletedTaskButtons
                    ) : (
                        completedTaskButtons
                    )}
                </form>

                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a onClick={this.toggleTasks} className={`nav-link ${this.state.toggleTasks ? 'active' : ''}`} href="#">Uncompleted Tasks</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={this.toggleTasks} className={`nav-link ${this.state.toggleTasks ? '' : 'active'}`} href="#">Completed Tasks</a>
                    </li>
                </ul>

                <ul className="list-group">
                    {tasks}
                </ul>
            </div>
        )
    }
}

export default Tasks;