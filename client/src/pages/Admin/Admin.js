import React, { Component } from "react";
import AddEmployee from "../../components/AddEmployee";
import PullTimes from "../../components/PullTimes";
import RemoveEmployee from "../../components/RemoveEmployee";
import AdminLanding from "../../components/AdminLanding";
import Header from "../../components/Header";


class Admin extends Component {

    state = {
        currentPage: ""
    }

    changePage = (page) => {
        this.setState({ currentPage: page });
    }

    checkPage = () => {
        switch (this.state.currentPage) {
            case 'add':
                return <AddEmployee />;
            case 'pull':
                return <PullTimes />;
            case 'remove':
                return <RemoveEmployee />;
            default:
                return <AdminLanding />;
        }
    }

    render() {
        return (
            <div>
                <Header
                    changePage={this.changePage}
                />
                {this.checkPage()}
            </div>
        )
    }
}

export default Admin;