const {MongoClient} = require('mongodb');



class DBConnect{
    constructor(){
        this.uri = process.env.DBLINK;
        this.client = new MongoClient(this.uri);
        this.database = null;
    }
    async startServ(){
        try{
            await this.client.connect();
            this.database = this.client.db('OneShot');
        }catch(e){
            console.log(e);
        }

    }
    async  runInsert(collection , data){
        try {
            const colls = this.database.collection(collection);
            let result = await colls.insertMany(data);
            console.log(result.insertedCount + "inserted")

        } finally {
        }
    }

    async  runRead(_collectionName, param){
        try {
      
            const collection = this.database.collection(_collectionName);
        
            const result = await collection.find(param);
            return await result.toArray();  
        } finally {
        }
    }
    async  runAggCount(pipeline, collections){
        try {
            const collection = this.database.collection(collections);
            const aggCursor = collection.aggregate(pipeline);
            return await aggCursor.toArray();
        } finally {
        }
    }
    async closeServ(){
        await this.client.close();
    }

}

class Helper{
    constructor(){
        this.mongo = new DBConnect ()
        this.mongo.startServ().catch(console.dir);
    }
    
    readCollegeData(){
        let data = readCollegeDataFile()
        console.log(data);
        this.mongo.runInsert("College1", data).catch(console.dir);
    }

     addStudents(){
        this.mongo.runInsert("Students1", data).catch(console.dir);
    }

    getStudentsDetsbyName(name){
        this.mongo.runRead("Students1",{name:name});
    }

    async  findCollege(params){
        let data = await this.mongo.runRead("College1", params).catch(console.dir);
        return (data);
    }
    
    async findStudent(params){
        let data = await this.mongo.runRead("Student1", params).catch(console.dir);
        return data;
    }
    async  findAllStudents(params){
        let data = await this.mongo.runRead("Students1", params);
        return (data);
    }
    async  getCollegeBatchData(param){
        const pipeline =[
            {$match:param}, 
            {$group: {_id:"$year_of_batch", students:{$sum:1}}}
        ]
        let data = await this.mongo.runAggCount(pipeline, "Students1").catch(console.dir);
        return data;
    }

    async studentsSkills(){
        const pipeline = [
            {$unwind:"$skills"},
            {$group:{
                _id:"$skills",
                count_students:{
                        $sum:1
                    }
                }
            }, 

        ];    
        let data = await this.mongo.runAggCount(pipeline, "Students1").catch(console.dir);
        return data;
    }

    async  getTopCollege(){
        const pipeline = [
            {$group:{_id:"$collegeId", students:{$sum:1}}},
            {$sort:{students:-1}},
            {$limit:4}
        ]
        let data = await this.mongo.runAggCount(pipeline, "Students1").catch(console.dir);
        for (let i = 0; i < data.length; i++) {
            const element = data[i];;
            let result = await this.mongo.runRead("College1", {id:(element._id)});
            element.name = result[0].name;
        }
        return data;
    }

    async getCollegeState(){
        const pipeline = [
            {$group:{_id:"$state", num:{$sum:1}}}
        ]
        let data = await this.mongo.runAggCount(pipeline, "College1").catch(console.dir);
        return data;
    }

    async getStudentCount(param){
        console.log(param);
        const pipeline = [
            {$match:param},
            {$count:"count"}
        ]
        let data = await this.mongo.runAggCount(pipeline, "Students1").catch(console.dir);
        return data;
    }
}

module.exports = new Helper;