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
                console.log(recognizeRes.data.className);
                this.setState({message: `Hello ${recognizeRes.data.className}!`})
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

                <h3 className = 'text-info center'>{this.state.message}</h3>

            </div>

        )
    }
}
export default Employee;
