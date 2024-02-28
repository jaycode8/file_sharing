
let multer = require('multer');
const cloudinary = require("./cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'james',
        allowed_formats: ['jpg', 'png', 'gif'],
    },
});
let upload = multer({ storage: storage });

module.exports = upload;
