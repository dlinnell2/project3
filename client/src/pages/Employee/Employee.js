import React from 'react';
import API from '../../utils/api.js'


class Employee extends React.Component {

    state = {
        message: ''
    }

    handleUploadImage = (e) => {
        e.preventDefault();


        let data = new FormData();
        data.append('file', this.uploadInput.files[0]);

        fetch('/api/employee/identify', {
            method: 'GET'
        }).then((res) => {
            console.log(res);
        });

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleUploadImage} className="center">

                    <div className="btn btn-success">
                        <input ref={(ref) => { this.uploadInput = ref; }} type="file" multiple onChange={this.trackFiles} />
                    </div>

                    <div>
                        <button className="btn btn-primary">Upload</button>
                    </div>

                </form>

            </div>

        )
    }
}
export default Employee;
