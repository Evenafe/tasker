import React, { Component } from 'react';
import axios from 'axios';

import { URL } from '../../App';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        };
        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
        this.update = this.update.bind(this);
    }

    onTitleChangeHandler(event) {
        const title = event.target.value;
        this.setState({ title });
    }

    onBodyChangeHandler(event) {
        const body = event.target.value;
        this.setState({ body });
    }

    update(event) {
        event.preventDefault();
        const { title, body } = this.state;

        axios.put(`${URL}/${this.props.match.params.task}`, { title, body })
            .then(response => console.log(response))
            .then(() => history.go(-1))
            .catch(error => console.log(error));
    }

    get() {
        axios.get(`${URL}/${this.props.match.params.task}`)
            .then(response => {
                const { title, body } = response.data;

                this.setState({ title, body });
            })
            .catch(error => console.log(error));
    };

    componentWillMount() {
        this.get();
    }

    render() {
        return(
            <div className="container">
                <form onSubmit={this.update}>
                    <div className="form-group">
                        <input onChange={this.onTitleChangeHandler} name="title" className="form-control" type="text" name="title" value={this.state.title}/>
                    </div>

                    <div className="form-group">
                        <textarea onChange={this.onBodyChangeHandler} name="body" className="form-control" cols="30" rows="3" value={this.state.body}></textarea>
                    </div>

                    <button className="btn btn-primary">Save changes</button>
                </form>
            </div>
        );
    }
}

export default Task;