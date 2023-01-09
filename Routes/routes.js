const express = require('express');
const router = express.Router();
const {
    gallery,
    imageUploads,
    noPage,
    uploadMultiples
} = require('./controlers');

let multer = require('multer');

// =============== setting up multer upload ==========
let storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'public/uploads');
    },
    filename:(req,file,cb) =>{
        const ext = file.mimetype.split('/')[1];
        cb(null,`${file.fieldname}-${Date.now()}.${ext}`);
    }
});
let upload = multer({storage:storage});

router.post('/uploadImg',upload.single('myFile'), imageUploads);

router.post('/uploadFiles',upload.array('myFiles',10), uploadMultiples);

router.get('/gallery', gallery);

router.use(noPage);

module.exports = router;