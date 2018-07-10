import React from 'react';
import API from '../../utils/api.js';
import ImageCompressor from 'image-compressor.js';


class AddEmployee extends React.Component {

    state = {
        images: 0,
        firstName: '',
        lastName: '',
        error: '',
        status: '',
        fileList: []
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    trackFiles = (e) => {
        let trackedFiles = []
        for (let i = 0; i < this.uploadInput.files.length; i++) {
            trackedFiles.push(this.uploadInput.files[i])
        }

        this.setState({ fileList: trackedFiles })
    }

    handleUploadImage = (e) => {
        e.preventDefault();

        this.setState({
            status:'Uploading images, please wait',
        })

        console.log(this);

        if (this.state.fileList.length >= 1) {

            this.state.fileList.forEach((file) => {

                const imageCompressor = new ImageCompressor();

                imageCompressor.compress(file, {width: 400, quality:0.8})
                    .then((result) => {
                        const formData = new FormData();

                        formData.append('file', result, result.name);

                        fetch('/api/admin/add/images', {
                            method: 'POST',
                            body: formData,
                        }).then((res) => {
                            console.log(res);
                            this.setState({
                                images: this.state.images + 1,
                                error: '',
                                status: ''
                            });
                        });

                    })

            })

        } else {
            this.setState({ error: 'Please select a image to upload' })
        }


    }

    addNewEmployee = (e) => {

        if (this.state.images > 0 && this.state.firstName && this.state.lastName) {

            this.setState({ status: 'Adding new employee, please wait' });
            let data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                fullName: `${this.state.firstName} ${this.state.lastName}`
            }

            API.recognizeNewEmployee(data)
                .then(recognizeRes => {
                    console.log('recognizeRes')
                    API.addEmployeeToDb(data)
                        .then(dbRes => {
                            API.saveState()
                                .then(res => {
                                    this.setState({ 
                                    status: `${dbRes.data.fullName} successfully added!`,
                                    images:0
                                    })

                                })
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
                    <h5>You may upload files individually, or select multiple at a time</h5>

                    <div className="btn btn-success">
                        <input ref={(ref) => { this.uploadInput = ref; }} type="file" multiple onChange={this.trackFiles} />
                    </div>

                    <br /> <br />

                    <div>
                        <button className="btn btn-primary">Upload</button>
                    </div>

                    <br />

                    <h4>You have successfully uploaded {this.state.images} {this.state.images === 1 ? 'image' : 'images'}</h4>


                    <h3 className='text-danger'>{this.state.error}</h3>
                    <h3 className='text-info'>{this.state.status}</h3>

                    <br />

                </form>
                <button type='button' onClick={this.addNewEmployee} className='webcam btn btn-primary'>Add New Employee</button>
            </div>
        )
    }
};

export default AddEmployee;