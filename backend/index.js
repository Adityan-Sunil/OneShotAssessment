const express = require('express');
const helper = require('./dbConn');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

const path = require("path");


app.use(express.static(path.resolve(__dirname, "./oneshotcollege/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./oneshotcollege/build", "index.html"));
});


app.listen(process.env.PORT||4000, ()=>{
    console.log("Listening")
});

app.post('/get_skill_count', async (req, res) => {
    let result = await helper.studentsSkills();
    res.send(result);
})

app.post('/get_popular_college', async (req, res) =>{
    let result = await helper.getTopCollege();
    res.send(result);
})

app.post('/get_college', async (req, res) =>{
    let result = await helper.findCollege(req.body);
    res.send(result);
})

app.post('/get_students', async (req, res) =>{
    let result = await helper.findStudent(req.body);
    res.send(result);
})

app.post('/get_batch_year', async (req,res) =>{
    let result = await helper.getCollegeBatchData(req.body);
    res.send(result);
})

app.post('/get_college_state', async(req, res) =>{
    let result = await helper.getCollegeState();
    res.send(result);
})

app.post('/get_student_count', async (req, res) =>{
    let result = await helper.getStudentCount(req.body)
    res.send(result);
})
