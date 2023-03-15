const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
const fileUpload = require("express-fileupload");

const userRouter = require("./routers/user.router");
const roleRouter = require("./routers/role.router")
const brandRouter = require("./routers/brand.router");
const productRouter = require("./routers/product.router")
const userModel = require("./models/user.model");
const roleModel = require("./models/role.model");
var origin_urls;
if(process.env.NODE_ENV == "development"){
    origin_urls =  [
        `${process.env.CLIENT_DEV_URL}`,
        `${process.env.ADMIN_DEV_URL}`,
      ];
}


const corsOptions = {
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
      "Authorization",
    ],
    credentials: true,
    methods: "GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
    origin: origin_urls,
    preflightContinue: false,
  };
  const  app = express();

  //cors
  app.use(cors(corsOptions));
  app.use(fileUpload());
  // const 

const server = require("http").createServer(app)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//middlewares
app.use(morgan("dev"))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_CLOUD, function(err){
    if (err) {
        console.log("Mongodb connected error");
      } else {
        console.log("Mongodb connected successfuly");
        initial();
      }
})

//port 
const port = process.env.PORT || 8000
const portServer = process.env.CLIENT_PORTSERVER || 8002

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})

server.listen(portServer, () => {
    console.log(`Servers running at localhost:${portServer}`);
})

app.use("/api/user", userRouter);
app.use("/api/role", roleRouter);
app.use("/api/brand", brandRouter);
app.use("/api/product", productRouter);


function initial(){
    userModel.estimatedDocumentCount((err, count)=>{
        if (!err && count == 0) {
            new userModel({
                username:"admin",
                password: bcrypt.hashSync("123123",10),
                name: "Trần Xuân Nhơn",
                role: "Admin",
            }).save((err)=>{
                if (err) {
                    console.log("error", err);
                  }
                  console.log("add user admin");
            })
        }
    })
    
    roleModel.estimatedDocumentCount((err,count)=>{
      if( !err && count === 0){
        new roleModel({
          name: "Admin", // bien tap vien
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'Editor' to roles collection");
        });
        new roleModel({
          name: "User", // bien tap vien
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'Editor' to roles collection");
        });
      }
    })
}