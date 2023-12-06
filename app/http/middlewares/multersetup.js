//Multer setup
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(file)
        const ext = file.originalname.split('.').pop();
        let location = "audios"
        if (ext == "wav" || ext == "mp3")
            location = "images"
        cb(null, `./user_assests/${location}`);
    },

    filename: (req, file, cb) => {
        cb(null, 'myfile.' + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
}).single("audioFile");

module.exports = upload