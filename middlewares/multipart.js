const multer = require('multer')

const uploadedFilesFolderName = 'public'

exports.uploadedFilesFolderName = uploadedFilesFolderName

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./" + uploadedFilesFolderName)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage });

exports.upload = upload 