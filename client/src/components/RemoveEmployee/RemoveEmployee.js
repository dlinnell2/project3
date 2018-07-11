import React from 'react';
import API from '../../utils/api.js';
import EmployeeListRemove from '../EmployeeListRemove';

class RemoveEmployee extends React.Component {

    state = {
        employees: [],
        noEmployees: false,
    };

    componentDidMount() {
        this.pullEmployees();
    }

    pullEmployees = () => {
        console.log('checking')
        API.getAll()
            .then((res) => {
                console.log(res)
                if (res.data.length > 0) {
                    this.setState({ employees: res.data })
                } else if (res.data.length === 0) {
                    this.setState({ 
                        noEmployees: true,
                        employees: res.data
                    })
                }
            })
    }

    refresh = (employee) => {
        API.deleteEmployee({fullName:employee})
            .then((res) => {
                console.log(res)
                API.deleteTimes({name:employee})
                    .then((res) => {
                        console.log(res)
                        this.pullEmployees()
                    })
            })
    }

    checkEmployees = () => {
        if (this.state.employees.length) {
            return (
                <div>

                    {this.state.employees.map((employee) => (

                        <EmployeeListRemove refresh={() => this.refresh(employee.fullName)} employee={employee} />

                    ))}

                </div>
            )
        } else if (this.state.noEmployees) {
            return (
                <h3 className='center text-danger'>No employees have been found</h3>
            )
        } else {
            return (
                <h3 className='center text-info'>Retrieving information, please wait</h3>
            )
        }
    }

    render() {
        return (

            <div className='container'>

                {this.checkEmployees()}

            </div>
        )
    }

}

export default RemoveEmployee