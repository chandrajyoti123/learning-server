import express from "express";
const app=express()
app.use(express.json())

const students=[]


// app.get('/chandani',(req,res)=>{
//     res.send(`
//     <h1>chandrajyoti adil</h1>
//     `)
    
// })

app.get('/study',(req,res)=>{
    const {id}=req.query
    let stu=null
    if(!students){
      return res.json({
        "result":false,
        "messege":"phone not  included"
                      })

    }
    students.map(student=>{
        if(student.id==id){
            stu=student
        }
    })
    res.json(stu)
})
app.post('/study',(req,res)=>{
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


    const id=Math.floor(Math.random()*10000)
 
    const obj={
        "id":id,
        "name":name,
        "phone":phone,
        "email":email
    }
    if(obj){
        students.push(obj)
    }


    res.json({
         "result":true,
        "students":students,
        "messege":"data  load succesfully"
          })
})

const port=5000
app.listen(port,()=>{
    console.log(`this server is running in port ${port}`)
})