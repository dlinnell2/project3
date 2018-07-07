import React from 'react';
import API from '../../utils/api.js'


class AddEmployee extends React.Component {

    state = {
        images: 0,
        firstName: '',
        lastName: '',
        error: '',
        status: ''
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleUploadImage = (e) => {
        e.preventDefault();

        if (this.uploadInput.files[0]) {

            const data = new FormData();
            data.append('file', this.uploadInput.files[0]);

            fetch('/api/admin/add/images', {
                method: 'POST',
                body: data,
            }).then((res) => {
                console.log(res);
                this.setState({
                    images: this.state.images + 1,
                    error: ''
                });
            });

        } else {
            this.setState({ error: 'Please select a image to upload' })
        }


    }

    addNewEmployee = (e) => {

        if (this.state.images > 0 && this.state.firstName && this.state.lastName) {

            this.setState({ status: 'Adding new employee, please wait' })
            console.log('click')
            let data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
            }

            API.recognizeEmployee(data)
                .then(recognizeRes => {
                    console.log('recognized')
                    API.addEmployeeToDb(data)
                        .then( dbRes => {
                            console.log('added to db', dbRes);
                            this.setState({status: `${dbRes.data.firstName} ${dbRes.data.lastName} successfully added!`})
                        })
                })

        } else if (this.state.images < 1) {
            this.setState({ error: `Please enter the employee's images` })
        } else if (!this.state.firstName) {
            this.setState({ error: `Please enter the employee's first name` })
        } else if (!this.state.lastName) {
            this.setState({ error: `Please enter the employee's last name` })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleUploadImage} className="center">

                    <h2>Please enter the employee's name</h2>

                    <input
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                        name="firstName"
                        placeholder="First Name"
                    />

                    <input
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                        name="lastName"
                        placeholder="Last Name"
                    />

                    <br /> <br />

                    <h3>Please select images to upload</h3>
                    <h4> A minimum of 5 is suggested </h4>

                    <div className="btn btn-success">
                        <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                    </div>

                    <br /><br />

                    <div>
                        <button className="btn btn-primary">Upload</button>
                    </div>

                    <br />
                    <h4>You have successfully uploaded {this.state.images} {this.state.images === 1 ? 'image' : 'images'}</h4>
                    <br />

                    <h3 className='text-danger'>{this.state.error}</h3>
                    <h3 className='text-info'>{this.state.status}</h3>

                </form>
                <button type='button' onClick={this.addNewEmployee}>Test</button>
            </div>
        )
    }
};

export default AddEmployee;