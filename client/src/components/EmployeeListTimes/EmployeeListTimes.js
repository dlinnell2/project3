import React from 'react';
import API from '../../utils/api.js';
import FunctionButton from '../FunctionButton';

class EmployeeListTimes extends React.Component {

    constructor(props) {
        super()

    }

    state = {
        times: [],
        hasTimes: ''
    };

    componentDidMount() {
        this.checkTimes({name:this.props.employee.fullName});
    }

    checkTimes = (name) => {
        API.getTimes(name)
            .then((res) => {
                console.log(res.data)
                if (res.data.length > 0) {
                    this.setState({ noTimes: false })
                    console.log(this.state.times)
                } else if (res.data.length === 0){
                    this.setState({ noTimes: true })
                }
            })

        }

    pullTimes = (name) => {
        console.log('click')
        API.getTimes(name)
            .then((res) => {
                console.log(res.data)
                this.setState({times:res.data})
            })
    }

    clearTimes = () => {
        this.setState({ times: [] })
    }

    displayTimes = () => {
        if (this.state.times.length) {
            return (
                <div className='col-sm-6' align='center'>

                    <FunctionButton
                        message='Collapse Times'
                        color = 'btn btn-primary'
                        onClick={this.clearTimes}
                    />

                    {this.state.times.map((time) => (
                        <div className='row justify-content-center'>
                            <h3>{time.createdAt}</h3>
                        </div>
                    ))}

                </div>
            )
        } else if (this.state.noTimes) {
            return (
                <div className='col-sm-6' align='center'>
                    <h4>No times been found for this employee</h4>
                </div>
            )
        } else {
            return (
                <div className='col-sm-6' align='center'>
                    <FunctionButton
                        message='View Times'
                        color='btn btn-primary'
                        onClick={() => this.pullTimes({ name: this.props.employee.fullName })}
                    />
                </div>
            )
        }
    }

    render() {

        return (

            <div className='row'>

                <div className='col-sm-6' align='center'>

                    <h3>{this.props.employee.fullName}</h3>

                </div>

                {this.displayTimes()}

            </div>
        )
    }

}

export default EmployeeListTimes;