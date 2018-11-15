import React from 'react';

const Nav = () => {
    return(
        <div className="container-fluid">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a href="/" className="nav-link">Home</a>
                </li>

                <li className="nav-item">
                    <a href="/tasks" className="nav-link">Tasks</a>
                </li>
            </ul>
        </div>
    );
};

export default Nav;