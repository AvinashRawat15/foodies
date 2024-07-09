import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js"
import foodRouter from "../back-end/routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import 'dotenv/config.js'
import orderRouter from "./routes/orderRoute.js"

//app config
const app = express()
const port = 4500

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectdb();

//api endpoints
app.use("/api/food",foodRouter)
app.use("images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get('/',(req,res)=>{
    res.send('Api called')
})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
});
