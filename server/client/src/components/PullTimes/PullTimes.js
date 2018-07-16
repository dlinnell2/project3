import React from 'react';
import API from '../../utils/api.js';
import EmployeeListTimes from '../EmployeeListTimes';

class PullTimes extends React.Component {

    state = {
        employees: [],
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

    render() {

        return (

            <div className='container'>

                {this.state.employees.length ? (

                    <div>

                        {this.state.employees.map((employee) => (

                                <EmployeeListTimes employee={employee} />

                        ))}

                    </div>

                ) : (<h3 className='center text-info'>Retrieving information, please wait</h3>)}



            </div>
        )
    }
}

export default PullTimes;