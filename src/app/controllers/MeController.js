const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [Get] /stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [Get] /trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({ deleted: true })
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
