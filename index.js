const express  = require('express')
const morgan = require ('morgan')
const  mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const port = process.env.port || 5000
require('dotenv').config()


// Routes for all pages 
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes')
const eventRoutes = require('./routes/eventRoutes')
const projectRoutes = require('./routes/projectRoutes')
const courseRoutes = require('./routes/courseRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const storyRoutes = require('./routes/storyRoutes')
// db connection 

const uri = "";

mongoose.connect(process.env.DABASE_MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log('connection successfuly'))
.catch((err)=>console.log(err));

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())


// Middlewire
app.use('/api', categoryRoutes)
app.use('/api', userRoutes)
app.use('/api', authRoutes)
app.use('/api', blogRoutes)
app.use('/api', eventRoutes)
app.use('/api', projectRoutes)
app.use('/api', courseRoutes)
app.use('/api', serviceRoutes)
app.use('/api', storyRoutes)


app.get("/api", (rq, res)=>{
    res.send("TIC Limited Servcer")
})

app.listen(port, ()=>{
    console.log(`Server is Running on the port of.${port}`)
})