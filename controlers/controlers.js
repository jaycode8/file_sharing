const fs = require('fs');
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const saltrounds = 10;
const secretkey = process.env.secretkey;
const jwt = require("jsonwebtoken");

const { usersSchema, filesSchema } = require("../models/files.model.js");
const usersModel = mongoose.model("users", usersSchema);
const filesModel = mongoose.model("files", filesSchema);

const signForms = (req, res) => {
    res.render("forms");
};

const addUser = async (req, res) => {
    try {
        const usernameTaken = await usersModel.find({ username: req.body.username, });
        if (usernameTaken == "") {
            const emailExists = await usersModel.find({ email: req.body.email, });
            if (emailExists == "") {
                const user = new usersModel(req.body);
                user.password = await bcrypt.hash(user.password, saltrounds);
                await user.save();
                res.json({ msg: "successfully regesterd", success: "true" })
            } else {
                res.json({ msg: "Email address already exists", success: "false" })
            }
        } else {
            res.json({ msg: "An account with similar username already exist", success: "false" })
        }
    } catch (err) {
        res.json({ msg: "Internal server error", success: "false" })
    }
}

const logInUser = async (req, res) => {
    try {
        const foundUser = await usersModel.find({ username: req.body.uname });
        if (foundUser != "") {
            const passCheck = await bcrypt.compare(req.body.passw, foundUser[0].password);
            if (passCheck) {
                let token = await jwt.sign({ user: foundUser[0]._id }, secretkey)
                res.json({ msg: "Success", "token": token, success: "true" });
            } else {
                res.json({ msg: "Invalid password", success: "false" })
            }
        } else {
            res.json({ msg: "Account with that username not found", success: "false" })
        }
    } catch (err) {
        res.json({ msg: "Internal server error", success: "false" })
    }
}

const fetchUser = async (req, res) => {
    try {
        const userData = await usersModel.findOne({ _id: req.id.user });
        res.json({ msg: "User fetched", user: userData, success: "true" })
    } catch (err) {
        res.json({ msg: "Internal server error", success: "false" })
    }
}

const imageUploads = async (req, res, next) => {
    const file = req.file;
    if (!file) {
        res.render('error', {
            classes: 'hide',
            warning: 'Please make sure you choose a file to upload',
            code: '400'
        });
    }
    else {
        let data = {
            file_url: req.file.filename,
            mimetype: req.file.mimetype,
            user: req.id.user
        };
        const file_data = new filesModel(data);
        await file_data.save();
        res.json({ success: "true", msg: "successfully uploaded image", user: req.id.user });
    };
};

const uploadMultiples = (req, res, next) => {
    const files = req.myFiles;
    if (!files) {
        res.render('error', {
            classes: 'hide',
            warning: 'Please make sure you choose a file to upload',
            code: '400'
        });
    }
    else {
        res.redirect('/gallery');
    };
}

const gallery = async (req, res) => {
    const user_files = await filesModel.find({ user: req.params.id });
    // console.log(user_files)
    // res.send(user_files);
    res.render('gallery', {
        title: 'Photo Gallery',
        fileData: user_files,
        heading: 'GALLERY'
    });
}

const gallery2 = (req, res) => {
    let dirName = './public/uploads'
    try {
        fs.readdir(dirName, (err, data) => {
            if (!err) {
                res.render('gallery', {
                    title: 'Photo Gallery',
                    fileData: data,
                    heading: 'GALLERY'
                });
            }
            else {
                res.render('error', {
                    classes: 'hide',
                    warning: 'Internal server error',
                    code: '500'
                });
            };
        });
    }
    catch (e) {
        res.render('error', {
            classes: 'hide',
            warning: 'Internal server error',
            code: '500'
        });
    };
};

const noPage = (req, res) => {
    res.render('error', {
        classes: 'show',
        warning: "We can't find that page",
        code: '404'
    });
};

const test = async (req, res) => {
    try {
        const file = req.file;
        //const results = await cloudinary.uploadler.upload(file, {
        //    folder: 'myDir'
        //});
        const result = await cloudinary.uploader.upload(file, {
            folder: 'myDir'
        })
        const image = {
            public_id: result.public_id,
            url: result.secure_url
        };
        console.log(result);
        res.json({ "img": image });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    gallery,
    imageUploads,
    noPage,
    uploadMultiples,
    signForms,
    addUser,
    logInUser,
    fetchUser
}
