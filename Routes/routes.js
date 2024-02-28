const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretkey = process.env.secretkey;
const {
    gallery,
    imageUploads,
    noPage,
    uploadMultiples,
    signForms,
    addUser,
    logInUser,
    fetchUser
} = require('../controlers/controlers');

// let upload = require("../utils/upload");
const multer = require("multer");
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
});
let upload = multer({ storage: storage });

const verifyToken = async (req, res, next) => {
    const accessToken = req.headers.authorization.split(' ')[1]
    try {
        if (!accessToken) {
            return res.status(400).json({ success: 'false', msg: 'please sign in first' });
        } else {
            const validateToken = await jwt.verify(accessToken, secretkey);
            if (validateToken) {
                req.authenticated = true;
                req.id = validateToken // this is the information response of the user sent to client
                return next()
            }
        }
    } catch (error) {
        if (accessToken.length < 5) {
            return res.status(400).json({ success: "false", msg: "please sign in first", state: "uptodate" })
        } else {
            return res.json({ success: 'false', msg: 'Token has expired.... please sign in', state: "expired" })
        }
    }
}

router.get("/forms", signForms);
router.post("/signup", addUser);
router.post("/user", logInUser);
router.get("/user", verifyToken, fetchUser);

router.post('/uploadImg', verifyToken, upload.single('myFile'), imageUploads);

router.post('/test', upload.single('myFile'), (req, res) => {
    res.json({ imageUrl: req.file.path, publicId: req.file });
    console.log(req)
});

router.delete('/test/:folder/:id', (req, res) => {
    const publicId = `${req.params.folder}/${req.params.id}`;
    const del = cloudinary.uploader.destroy(publicId)
    res.json({ msg: "successfully deleted image" })
})

router.post('/uploadFiles', upload.array('myFiles', 10), uploadMultiples);

router.get('/gallery/:id', gallery);

router.use(noPage);

module.exports = router;
