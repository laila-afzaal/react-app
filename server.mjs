import express from "express"
import cors from "cors"
import mongoose from 'mongoose';
import { stringToHash, varifyHash } from "bcrypt-inzi"

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4001;


const userSchema = new mongoose.Schema({

    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },

    age: { type: Number, min: 17, max: 65, default: 18 },
    isMarried: { type: Boolean, default: false },

    createdOn: { type: Date, default: Date.now },
});
const userModel = mongoose.model('User', userSchema);



app.post("/signup", (req, res) => {

    let body = req.body;

    if (!body.firstName
        || !body.lastName
        || !body.email
        || !body.password
    ) {
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }

    // check if user already exist // query email user
    userModel.findOne({ email: body.email }, (err, data) => {
        if (!err) {
            console.log("data: ", data);

            if (data) { // user already exist
                console.log("user already exist: ", data);
                res.status(400).send({ message: "user already exist,, please try a different email" });
                return;

            } else { // user not already exist

                stringToHash(body.password).then(hashString => {

                    userModel.create({
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email.toLowerCase(),
                        password: hashString
                    },
                        (err, result) => {
                            if (!err) {
                                console.log("data saved: ", result);
                                res.status(201).send({ message: "user is created" });
                            } else {
                                console.log("db error: ", err);
                                res.status(500).send({ message: "internal server error" });
                            }
                        });
                })

            }
        } else {
            console.log("db error: ", err);
            res.status(500).send({ message: "db error in query" });
            return;
        }
    })
});


app.get("/users", async (req, res) => {

    try {
        let allUser = await userModel.find({}).exec();
        res.send(allUser);

    } catch (error) {
        res.status(500).send({ message: "error getting users" });
    }
})








app.post("/login", (req, res) => {

    let body = req.body;

    if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }

     // check if user already exist // query email user
     userModel.findOne({ email: body.email }, (err, data) => {
        if (!err) {
            console.log("data: ", data);

            if (data) { // user found
                varifyHash(body.password, data.password).then(isMatched => {

                 console.log('isMatched:', isMatched);

                 if(isMatched){
                    //todo: add jwt token
                    res.send({ message: "login successful",
                    profile: data });
                    return;
                 }else{
                    console.log("user not found: ");
                    res.status(401).send({ message: "Incorrect email or password" });
                    return;
                 }
                }) 

            } else { // user not already exist

                console.log("user not found: ");
                res.status(401).send({ message: "Incorrect email or password" });
                return;


            }
        } else {
            console.log("db error: ", err);
            res.status(500).send({ message: "login failed, please try later" });
            return;
        }
    })
   
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


///////////////////// - MongoDB Connection Code- ////////////////////////////////

let dbURI = 'mongodb+srv://xyz:321@cluster0.zwm89fi.mongodb.net/reactAppDatabase?retryWrites=true&w=majority';
// let dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
  console.log("Mongoose is connected");
  // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
  console.log('Mongoose connection error: ', err);
  process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log('Mongoose default connection closed');
    process.exit(0);
  });
});
//boiler plate from : https://github.com/mInzamamMalik/MERN-Stack-Web-Development-Class/blob/main/03.%20nodejs/7.%20express%20login%20signup%20with%20database/server.mjs
////////////////mongodb connected disconnected events///////////////////////////////////////////////