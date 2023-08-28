const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        image: {
            type: [String],
            required: true
        },
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        userId:{
            type: String,
            required: true
        },
        comments:{
            type:[String],
            required: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("post", PostSchema);
