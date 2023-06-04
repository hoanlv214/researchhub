const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    typePost: {
        type: String,
        default: "article"
    },
    dateOfPublication: {
        type: Date,
        default: Date.now
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    user: { type: mongoose.Types.ObjectId, ref: "user" }
}, {
    timestamps: true
})

postSchema.index({ content: 'text' });
module.exports = mongoose.model("post", postSchema)