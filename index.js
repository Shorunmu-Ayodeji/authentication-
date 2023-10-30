require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose')
const authRouter = require("./routes/authRoutes")


//midlewares
app.use(express.json())

//routes
app.use('/api',authRouter)


//error routes
app.use((req, res) => {
    res.status(404).json({message: "resource not found"});
});

//database connection
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, () =>{
            console.log(`SERVER RUNNING ON  : ${PORT}`);
        })
    } catch (error) {
      console.log(error);  
    }
}
start()