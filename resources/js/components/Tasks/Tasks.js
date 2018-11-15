import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

import { URL } from '../App';

class Tasks extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            checkedTasks: []
        };

        this.select = this.select.bind(this);
        this.delete = this.delete.bind(this);
        this.complete = this.complete.bind(this);
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
                .catch(error => console.log(error));
        })
        .then(location.reload());
    }

    complete() {
        this.state.checkedTasks.map(task => {
            axios.put(`${URL}/${task}`, { completed: true })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        })
    }

    select(event) {
        const { checked, id } = event.target;

        if (checked) {
            let checkedTasks = new Set([...this.state.checkedTasks, parseInt(id)]);
            checkedTasks = Array.from(checkedTasks);
            this.setState({ checkedTasks });
        } else {
            const unCheckedTasks = this.state.checkedTasks.filter(task => task === id);
            this.setState({ checkedTasks: unCheckedTasks });
        }
    }

    toggleTasks() {
        this.setState({ toggleTasks: !this.state.toggleTasks });
    }

    componentWillMount() {
        this.get();
    }

    render() {
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
                </form>

                <button className="btn btn-danger" onClick={this.delete}>Delete</button>

                <button className="btn btn-success" onClick={this.complete}>Mark as Complete</button>

                <ul className="list-group">
                    {this.state.tasks.map(task => (
                        <li className={'list-group-item'} key={task.id}>
                            <input id={task.id} onChange={this.select} className="task-checkbox" type="checkbox"/>
                            <Link
                                to={`/tasks/${task.id}`}
                                className={'list-group-item list-group-item-action'}>
                                {task.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Tasks;