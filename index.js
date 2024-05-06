require("dotenv").config();
const express = require("express")
const app = express();
const PORT = process.env.PORT || 5000;
const instanceRoute = require("./routers/connect-instance-route");
const databaseRoute = require("./routers/database-route");
const authRoute = require("./routers/auth-route");
const userRoute = require("./routers/user-route");
const contactRoute = require("./routers/contact-route")
const connectDB = require("./utils/db");
const errorHandler = require("./middleware/error-middleware")
const cors = require("cors")
// const mongoose=require("mongoose")
// const URL="mongodb+srv://user:user%40123@cluster0.d5ibn97.mongodb.net/"

// CORS Policy issue 
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));
//middleware
app.use(express.json());
//connect DB
connectDB();
//mount the router
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/form", contactRoute);
app.use("/api/v1/instances", instanceRoute);
app.use("/api/v1/databases", databaseRoute);
app.use("/api/v1/users", userRoute);
//error middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Backend is running at PORT ${PORT}`);
})


// connectDB.connect(()=>console.log("Db connection successful!"));

// app.listen(PORT,()=>{
//     console.log(`Server is running at PORT ${PORT}`);
// })