const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors())
app.use(express.json())
const userRouter = require("./Routes/user");
const ProductRouter = require("./Routes/products");
const adminRouter = require("./Routes/admin");
const cartRouter = require("./Routes/Cart");

app.use("/user",userRouter)
app.use("/ProductRouter",ProductRouter)
app.use("/adminRouter",adminRouter)
app.use("/cartRouter",cartRouter)

app.listen(5300,()=>{
    console.log("Server is running on port 5300")
})

