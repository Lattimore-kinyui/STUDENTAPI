const Student = require("../models/studentsmodel");
const createError =require("http-errors");
module.exports={

    addStudent: async (req, res, next) => {
    try {
        const student = new Student(req.body);
        const result = await student.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if(error.name==="ValidationError") {
            return next(createError(400, error.message));
        }
        next(createError(500, "Internal Server Error"));
    }
},
        getAllStudents: async (req, res, next) => {
    try {
        const students = await Student.find({});
        res.send(students);
    }   catch (error) {
        console.log(error.message);
        next(createError(500, "Internal Server Error"));
    }
},
        deleteStudent:async(req, res, next) => {
    const id = req.params.id
    try {
        const student = await Student.findByIdAndDelete(id) 
        res.send(student);
    } catch (error) {
        console.log(error.message);
        next(createError(500, "Internal Server Error"));
    }
},
updateStudent:async (req, res, next)=> {
    try {
        const id = req.params.id;
        const update = req.body;
        const options ={new: true}
        const result = await Student.findByIdAndUpdate(id, update, options)

        res.send(result);

    } catch (error) {
        console.log(error.message)
    }
}







}