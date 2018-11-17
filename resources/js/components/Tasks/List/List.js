import React from 'react';
import { Link } from "react-router-dom";

const List = props => {
    const tasks = props.tasks.map(task => {
        const taskList = <li className={ 'list-group-item' } key={task.id}>
                            <input id={ task.id } onChange={ props.select } className="task-checkbox" type="checkbox"/>
                            <Link
                                to={ `/tasks/${task.id}` }
                                className={ 'list-group-item list-group-item-action' }>
                                {task.title}
                            </Link>
                        </li>;

        if (!task.completed && props.toggleTasks) {
            return taskList;
        } else if (task.completed && !props.toggleTasks) {
            return taskList;
        }
    });

    return(
        <ul className="list-group">
            { tasks }
        </ul>
    );
};

export default List;