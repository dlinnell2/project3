import React from 'react';
import Webcam from 'react-webcam';
import API from '../../utils/api.js'


class Employee extends React.Component {

    state = {
        message: ''
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    capture = (e) => {
        e.preventDefault();
        const imageSrc = this.webcam.getScreenshot();
        console.log(imageSrc)

        var data = new FormData();
        data.append("image_data", imageSrc);

        fetch('/api/employee/identify', {
            method: 'post',
            body: data
        }).then((res) => {
            console.log(res);
        });
    };

    render() {

        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: 'user',
        };

        return (
            <div>

                <Webcam
                    audio={false}
                    height={550}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={550}
                    videoConstraints={videoConstraints}
                    className='webcam'
                />
                <button onClick={this.capture} className='webcam'>Capture photo</button>

            </div>

        )
    }
}
export default Employee;
