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

        var data = new FormData();
        data.append("image_data", imageSrc);

        API.recognizeEmployee(data)
            .then( recognizeRes => {
                API.clockIn({name:recognizeRes.data.className})
                    .then( dbRes => {
                        this.setState({message: `Hello ${dbRes.data.name}!`})
                    })
            })
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

                <br />

                <h3 className = 'text-info center'>{this.state.message}</h3>

            </div>

        )
    }
}
export default Employee;
