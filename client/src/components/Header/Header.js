import React, { Component } from "react";

const Header = (props) => (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => props.changePage("add")}>Add Employee</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => props.changePage("pull")}>Pull Times</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => props.changePage("remove")}>Remove Employee</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
                )
                
export default Header;