const fr = require('face-recognition');
const detector = fr.FaceDetector();
const recognizer = fr.AsyncFaceRecognizer();
const fs = require('fs');
const path = require('path');

module.exports = {
    addNew: function (req, res) {
        console.log(req.body);
        fs.readdir(`${__dirname}/addEmpImages`, (err, files) => {
            if (err) console.log(err);

            console.log(files);

            if (files.length > 0) {

                let faces = [];

                files.forEach(file => {
                    let imageFile = fr.loadImage(`${__dirname}/addEmpImages/${file}`)
                    console.log(typeof imageFile);
                    let detectedImage = detector.detectFaces(imageFile);
                    faces.push(detectedImage[0]);
                })

                if (fs.existsSync(path.join(__dirname, 'model.json'))) {
                    console.log('found');
                    const savedModel = require(path.join(__dirname, 'model.json'))
                    recognizer.load(savedModel)
                }

                recognizer.addFaces(faces, `${req.body.firstName} ${req.body.lastName}`)
                    .then(

                        () => {
                            const modelState = recognizer.serialize();
                            fs.writeFileSync(path.join(__dirname, 'model.json'), JSON.stringify(modelState));
                            console.log('saved');
                        },

                        files.forEach(file => {
                            fs.unlink(`${__dirname}/addEmpImages/${file}`, (err) => {
                                if (err) console.log(err);
                            })
                        }), res.sendStatus(200)

                    );


    } else {
        res.send('no images');
    }

})

    },

identify: function (req, res) {
    console.log('hit');
    console.log(req.body);
    res.send('hit');
}
};