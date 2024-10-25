const express = require('express');
const path = require('path')
const cors = require('cors')
const courseRouter = require('./routes/course_route')
const userRouter = require('./routes/user_route')

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

//For cors middleware
app.use(cors())

//For course routers
app.use(courseRouter)

//For user routers
app.use(userRouter)

app.get("/",(req,res)=>{
    res.send("Welcome to Knowledge Sharing Platform")
})
// Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
