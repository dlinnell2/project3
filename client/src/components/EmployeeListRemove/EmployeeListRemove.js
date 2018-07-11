import React from 'react';
import API from '../../utils/api.js';
import FunctionButton from '../FunctionButton';

class EmployeeListRemove extends React.Component {

    constructor(props) {
        super()

    }

    state = {
        clicked: false
    }

    evaluateClick = () => {
        if (this.state.clicked) {
            return (
                <div className='col-sm-7'>
                    <div className='row justify-content-center'>
                        <h3> Are you sure you want to remove {this.props.employee.fullName}?</h3>
                    </div>
                    <div className='row justify-content-center'>
                        <FunctionButton
                            message='Remove Employee'
                            color='btn btn-success'
                            onClick={() => this.props.refresh()}
                            style={{marginRight:'5px'}}
                        />
                        <FunctionButton
                            message='Cancel'
                            color='btn btn-danger'
                            onClick={() => this.setState({ clicked: false })}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <div className='col-sm-7' align='center'>
                    <FunctionButton
                        message='Remove Employee'
                        color='btn btn-danger'
                        onClick={() => this.setState({ clicked: true })}
                    />
                </div>
            )
        }
    }

    render() {
        return (

            <div className='row'>

                <div className='col-sm-5' align='center'>

                    <h3>{this.props.employee.fullName}</h3>

                </div>

                {this.evaluateClick()}

            </div>

        )
    }
}

export default EmployeeListRemove;