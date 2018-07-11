import React from 'react';
import API from '../../utils/api.js';
import EmployeeListRemove from '../EmployeeListRemove';

class RemoveEmployee extends React.Component {

    state = {
        employees: [],
        message: ''
    };

    componentDidMount() {
        this.pullEmployees();
    }

    pullEmployees = () => {
        API.getAll()
            .then((res) => {
                this.setState({ employees: res.data })
            })
    }

    refresh = (name) => {
        API.getAll()
            .then((res) => {
                this.setState({ 
                    employees: res.data,
                    message: `${name} successfully removed`
                 })
            })
    }

    render () {
        return (

            <div className='container'>

                {this.state.employees.length ? (

                    <div>

                        {this.state.employees.map((employee) => (

                                <EmployeeListRemove refresh={() => this.refresh()} employee={employee} />

                        ))}

                    </div>

                ) : (<h3 className='center text-info'>Retrieving information, please wait</h3>)}

                <h3 className='text-info'>{this.state.message}</h3>

            </div>
        )
    }

}

export default RemoveEmployee