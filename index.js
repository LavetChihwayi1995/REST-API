const express= require("express"); 
const database = require("mime-db");
const mysql= require("mysql");
const app=express();
app.use(express.json())
// Database connection...........................
const con= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"Interview",
});

// Error Handling..........................
con.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Connected!!!!")
    }
});

// Fetching data and sorting it......................
app.get("/fetch", (req,res)=>{
    con.query("SELECT * FROM contacts GROUP BY name ASC", (err, result, fields)=> {
        if(err){
            console.log(err)
        }else{
            res.send(result) 
        }
    })
});

// Posting data to database.........................
app.post("/post",(req,res)=>{
    // console.log(req.body.name)
    const name=req.body.name;
    const email=req.body.email;
    const address=req.body.address;
    const mobile1=req.body.mobile1;
    const mobile2=req.body.mobile2;

    con.query('insert into contacts (name, email, address, mobile1 , mobile2) values (?, ?, ?,?, ?)',[name,email,address,mobile1,mobile2], (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Post Successful !!!")
        }
    });
});
// updating data in database..................................
app.put("/update/:contactId", (req,res)=>{
    const contactId=req.params.contactId;
    const name=req.body.name;
    const email=req.body.email;
    const address=req.body.address;
    const mobile1=req.body.mobile1;
    const mobile2=req.body.mobile2;

    con.query('Update contacts set name=?,email=?,address=?,mobile1=?,mobile2=? Where contactId=?',[name,email,address,mobile1,mobile2,contactId], (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Update Successful !!!")
        }
    })

})

// Deleting record in database..................................
app.delete("/delete/:contactId", (req,res)=>{
    const contactId=req.params.contactId;
    const name=req.body.name;
    const email=req.body.email;
    const address=req.body.address;
    const mobile1=req.body.mobile1;
    const mobile2=req.body.mobile2;

    con.query('Delete from contacts Where contactId=?',[contactId], (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Delete Successful !!!")
        }
    })

})

// Searching record either by name, email, mobile............................
app.get("/search/:nameEmailPhone", (req,res)=>{
    const nameEmailPhone=req.params.nameEmailPhone;
    
    con.query('Select * from contacts Where name=? or email=? or mobile1=? or mobile2=?',[nameEmailPhone,nameEmailPhone,nameEmailPhone,nameEmailPhone], (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })

})

// Listening to port 4000............................
app.listen(4000, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("On port 4000") 
    }
});