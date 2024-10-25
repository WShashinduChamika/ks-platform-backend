const express = require('express')
const {createCourse, getCourses, getCourse} = require("../controllers/course_controller");

const router = express.Router()


// Endpoint to create a course
router.post('/api/course',createCourse)

// Endpoint to get courses data
router.get('/api/course', getCourses);

//Endpoint to get a course data by id
router.get('/api/course/:id', getCourse)

module.exports = router