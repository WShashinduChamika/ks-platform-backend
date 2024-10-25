const fs = require('fs')
const {v4:uuidv4} = require('uuid')

// Load course function that returns the course data
const loadCourse = () => {
    try{
        const dataBuffer = fs.readFileSync('./data/course.json')
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON)
        return  data
    }catch (e){
        console.log("Error when reading file is ",e.message)
        return []
    }
};

// Save course function that create and update a course
const saveCourse = (course)=>{
    try{
        const courseJSON = JSON.stringify(course)
        fs.writeFileSync('./data/course.json',courseJSON)
        return courseJSON
    }catch (e){
        console.log("The error when write the file is ",e.message)
        return []
    }
}

//Function that create a course
const createCourse = (req,res)=>{

    const course = req.body

    //Ensure that needed course information is available
    if (!course.name || !course.year || !course.technology || !course.level){
        res.status(400).send({error:"Missing course information"})
    }

    const courses = loadCourse()

    course.id = uuidv4() //create id for a new course
    courses.push(course)

    const saveResult =  saveCourse(courses)

    //Ensure weather course is saved or not
    if (saveResult){
        res.status(201).send({data:course})
    }else{
        res.status(500).send({error:'Failed to save new course'})
    }
}

//Function that retrieve courses
const getCourses = async(req, res) => {
    const courses = await loadCourse();
    //console.log(courses)
    if (courses) {
        res.status(200).send({message:'Success', data:courses});  // Send the course data
    } else {
        res.status(500).send({ error: "Failed to retrieve course data" });
    }
}

//Function that retrieve a course
const getCourse = (req,res)=>{

    const {id} = req.params
    if (!id){
        res.status(400).send({error:"Please provide id of the course"})
    }

    const courses = loadCourse()
    const course = courses.filter((course)=> course.id === id.toString())

    if (course){
        res.status(200).send({data:course})
    }else{
        res.status(400).send({error:"There is no such a course"})
    }
}

module.exports = {
    createCourse,
    getCourses,
    getCourse
}