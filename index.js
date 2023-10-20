import express from "express";
const app = express()

import dotennv from 'dotenv';
dotennv.config();

app.use(express.json())
import mongoose, { model } from "mongoose";
import {Schema } from "mongoose";

const loadmongodbserver=()=>{
    const responseofURI=mongoose.connect(process.env.MONGODB_URI)
    if(responseofURI){
        console.log("mongoose connected sucessfully")
    }
    
}
loadmongodbserver()

const StudentSchema=new Schema({
    name:String,
    phone:String,
    email:String
})

const Student = mongoose.model('Student', StudentSchema);



// app.get('/study', (req,res)=>{
//     const {id}=req.query
//     let stu=null
//     if(!students){
//       return res.json({
//         "result":false,
//         "messege":"phone not  included"
//                       })

//     }
//     students.map(student=>{
//         if(student.id==id){
//             stu=student
//         }
//     })
//     res.json(stu)
// })


app.post('/study',async (req,res)=>{
    const {name,phone,email}=req.body
    if(!name){
       return res.json({
        "result":false,
        "messege":"name not included"
                })
    }
    if(!phone){
       return res.json({
        "result":false,
        "messege":"phone not included"
                })
    }
    if(!email){
      return res.json({
        "result":false,
        "messege":"email not included"
                })
    }


    // const id=Math.floor(Math.random()*10000)
 
   const studentinstance=new Student({
    name:name,
    phone:phone,
    email:email  
   })
    const saveStudent= await studentinstance.save()


    res.json({
         "result":true,
        "students":saveStudent,
        "messege":"data  load succesfully"
          })
})

app.get('/students',async(req,res)=>{

    const getStudent= await Student.find()
    res.json({

  "result":true,
        "students":getStudent,
        "messege":"data  load succesfully"
    })
})

app.get('/getbyid', async (req,res)=>{
    const {_id}=req.query
    const findOneStudent=await Student.findOne({_id:_id})
    res.json({
        "result":true,
        "students":findOneStudent,
        "messege":"data  load succesfully"

    })
})

const port=5000
app.listen(port,()=>{
    console.log(`this server is running in port ${port}`)
})