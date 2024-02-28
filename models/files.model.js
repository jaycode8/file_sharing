const mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

let filesSchema = new mongoose.Schema({
    file_url: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

module.exports = { usersSchema, filesSchema }
