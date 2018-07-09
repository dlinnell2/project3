const fr = require('face-recognition');
const detector = fr.FaceDetector();
const recognizer = fr.AsyncFaceRecognizer();
const fs = require('fs');
const path = require('path');
const base64ToImage = require('base64-to-image');

module.exports = {
    addNew: function (req, res) {
        console.log(req.body);
        fs.readdir(`${__dirname}/addEmpImages`, (err, files) => {
            if (err) console.log(err);

            console.log(files);

            files.shift();

            if (files.length > 0) {

                let faces = [];

                files.forEach(file => {
                    let imageFile = fr.loadImage(`${__dirname}/addEmpImages/${file}`)
                    let detectedImage = detector.detectFaces(imageFile);
                    console.log(detectedImage);
                    faces.push(detectedImage[0]);
                })

                console.log(faces);

                if (fs.existsSync(path.join(__dirname, 'model.json'))) {
                    console.log('found');
                    const savedModel = require(path.join(__dirname, 'model.json'))
                    recognizer.load(savedModel)
                }

                recognizer.addFaces(faces, `${req.body.firstName} ${req.body.lastName}`)
                    .then(

                        res.send('added to recognizer')

                    );


            } else {
                res.send('no images');
            }

        })

    },

    identify: function (req, res) {
        let base64 = req.body.image_data;
        let pathName = path.join(__dirname, 'clockInImages', 'image');
        base64ToImage(base64, pathName);

        fs.readdir(`${__dirname}/clockInImages`, (err, files) => {
            if (err) console.log(err);

            console.log(files);

            let detectedFace = detector.detectFaces(files[0]);

            const savedModel = require(path.join(__dirname, 'model.json'))
            recognizer.load(savedModel)

            const bestPrediction = recognizer.predictBest(detecedFace)
            console.log(bestPrediction)


        })
    },

    saveState: function (req, res) {

        fs.readdir(`${__dirname}/addEmpImages`, (err, files) => {
            if (err) console.log(err);

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
        })

    }
};