const fs = require('fs');
const DBConnect = require('./dbConn');
function randomInt(min, max){
    return min +  Math.round(Math.random(max)) 
}

function readCourseData(){
    let recordLine = [];
    res = fs.readFileSync('./Course.csv', 'utf-8')//,(err, res) =>{
    let i=0;
    let record = "";
    while(i < res.length){
        if(res[i] === '\n'){
            let recordEntry = record.split(",");
            let obj = {
                Degree:recordEntry[0], 
                Course:recordEntry[1]
            }
            recordLine.push(obj);
            record = ""
        } else 
            if(res[i] != '\r')
                record += res[i];
        i+= 1;    
    }
    return recordLine;

}//readCourseData();
function genStudentData(){
    let skills = ['C++', 'C', 'Python', 'Java', 'HTML', 'JavaScript', 'CSS', 'React', 'NodeJs', 'Flask','GoLang'];
    let years = [2017, 2018, 2019, 2020, 2021, 2022]
    let data = [];
    let courses = readCourseData();
    let count = 1;
    for (let i = 0; i < 1001; i++) {
        let collegeId = i;
        let offset = randomInt(0,200);
        for (let j = 0; j < 100 + offset; j++) {
            let year;
            let course;
            let skls = [];
            const shuffled = skills.sort(() => 0.5 - Math.random());
            const year_shud = years.sort(() => 0.5 - Math.random());
            const course_shuff = courses.sort(() => 0.5 - Math.random());

            for (let k = 0; k < 3; k++) {   
                const inx = randomInt(skills.length - 1) - 1
                const skill = skills[inx];
                const y_inx = randomInt(0,6); 
                const course_idx = randomInt(0, courses.length - 1);

                if(skls.length < 1 || skls.indexOf(skill) === -1)
                    skls.push(skill);
                year = years[y_inx];
                course = courses[course_idx];
            }
            let obj = {
                id:j,
                name:'Student '+(j+1),
                collegeId:collegeId,
                year_of_batch: year,
                skills: skls,
                degree: course.Degree,
                course: course.Course
            }
            data.push(obj);
            count = count + 1;
        }
    }
    return data;
}//genStudentData();

function readCollegeDataFile(){
    let recordLine = [];
    res = fs.readFileSync('./college.csv', 'utf-8')//,(err, res) =>{
    let match = /[\n][0-9]*[.][\s]/g
    recordLine = (res.split(match));
    fs.close;
    console.log(recordLine[10]);
    let data = []
    var state = "";
    let count = 1;
    recordLine.forEach(record => {
        // console.log("--"+record);
        if(record === record.toUpperCase()){
            state = record.trim();
            console.log(state);
        } else {
            // console.log("--"+record);
            record = record.trim()
            let obj = {
                id:count,
                name:record.substring(0, record.indexOf(',')),
                data: record.substring(record.length - 4, record.length),
                state:state,
                address: record.substring(record.indexOf(',') + 2, record.indexOf('.', record.indexOf(',')))
            }
            count += 1;
            data.push(obj);
        }
    });
    return data;
}
// const student_data = genStudentData();
const college_data = readCollegeDataFile();
DBConnect.startServ().then(async()=>{
    // await DBConnect.runInsert( "Students1", student_data,);
    await DBConnect.runInsert( "College1", college_data,);
    DBConnect.closeServ();
})

