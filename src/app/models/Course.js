const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, maxlength: 600 },
        image: { type: String, maxlength: 255 },
        slug: { type: String, slug: 'name', unique: true },
        videoId: { type: String },
        level: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Course', Course);
