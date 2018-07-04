const fr = require('face-recognition');
const detector = fr.FaceDetector();
const recognizer = fr.AsyncFaceRecognizer();
const fs = require('fs');
const path = require('path')

module.exports = {
    addNew: function (req, res) {
        fs.readdir(`${__dirname}/addEmpImages`, (err, files) => {
            if (err) console.log(err);

            if (files.length < 0) {

                let faces = [];

                files.forEach(file => {
                    let imageFile = fr.loadImage(`${__dirname}/addEmpImages/${file}`)
                    console.log(typeof imageFile);
                    let detectedImage = detector.detectFaces(imageFile);
                    faces.push(detectedImage[0]);
                })

                console.log(faces);

                if (fs.existsSync('./model.json')) {
                    const savedModel = require('model.json')
                    recognizer.load(savedModel)
                }

                recognizer.addFaces(faces, 'req.body.firstName req.body.lastName')
                    .then(
                        files.forEach(file => {
                            fs.unlink(`${__dirname}/addEmpImages/${file}`, (err) => {
                                if (err) console.log(err);
                            })
                        }),
                        () => {
                            const modelState = recognizer.serialize();
                            fs.writeFileSync('model.json', JSON.stringify(modelState));
                        }

                )

            } else {
                res.send('no images');
            }

        })

    },

    identify: function (req, res) {
        console.log(req.files);
    }
};