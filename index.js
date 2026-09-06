import dns from 'dns'
dns.setServers(['8.8.8.8', '1.1.1.1']);
import express from 'express'
import mongoose from "mongoose"
const app = express()
const port = 4444
import studentRoute from "./routes/studentRoutes.js"
app.use(express.json())
app.use("/students", studentRoute)
const atlas_string = "mongodb+srv://adebayot971_db_user:adebayot971_db_user@cluster0.uwtjtbj.mongodb.net/cohot8_db?appName=Cluster0"

mongoose.connect(atlas_string).then(() => { console.log("mongoDB is connected...");
}).catch((err) => { console.log("MongoDB fail to connect", err.message);
})
app.get("/" , (req, res) => {
    res.send("This is my first API")
})

app.listen(port , () => {
    console.log(`This server is running on port: ${port}`);  
})

// completed
