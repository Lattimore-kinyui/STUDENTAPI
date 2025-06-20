const express = require('express')

const studentroutes = require('./routes/api');


require('dotenv').config();
require('./helpers/init_mongodb');
const app = express();
app.use(express.json());
app.use(studentroutes);

//handling 404 error
app.use((req,res,next)=>{
    const err = new Error("Not Found");
    err.status= 404
    next(err)
})

app.post('/postStudents', (req, res) => {
    const { firstname, lastname, gender } = req.body;
    // Add your logic here, e.g., save to database
    res.status(201).json({ message: "Student posted successfully" });
});


//error handler
app.use((err,req,res,next)=>{
    res.status(err.status|| 500)
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    })
})

app.listen(process.env.port || 4000, function(){
    console.log('Now listening for requests on: http://localhost:4000');

});