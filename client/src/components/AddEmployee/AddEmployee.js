import React from 'react';


class AddEmployee extends React.Component {

    state = {
        images: 0,
        firstName: '',
        lastName: '',
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleUploadImage = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);

        fetch('/api/admin/add/images', {
            method: 'POST',
            body: data,
        }).then((res) => {
            console.log(res);
            this.setState({ images: this.state.images + 1 })
        });
    }

    click = () => {
        console.log('click');
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

                </form>
                <button type='button' onClick={this.click}>Test</button>
            </div>
        )
    }
};

export default AddEmployee;