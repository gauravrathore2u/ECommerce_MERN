const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 8080;

//mongoDB connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('connected to  mongodb'))
    .catch((err) => console.log(err))

// User Section 

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    confirmPassword: String,
    profilePic: String
})

//model 
const userModel = mongoose.model("user", userSchema);

//APIs

app.get('/', (req, res) => {
    res.send("server is running");
});


//SignUp API
app.post('/signup', async (req, resp) => {
    const { email } = req.body;

    const userdata = await userModel.findOne({ email: email });
    if (userdata) {
        resp.send({ message: "Email id is already register", alert: false });
    }
    else {
        const data = new userModel(req.body);
        const save = await data.save();
        resp.send({ message: 'SignUp Successfully', alert: true });
    }
})


//Login API
app.post('/login', async (req, resp)=>{
    const {email} = req.body;
    const userData = await userModel.findOne({email : email});
    if(userData){
        const sendData = {
            _id : userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            profilePic: userData.profilePic
        }
        const isPasswordMatched = (req.body.password === userData.password);
        if(isPasswordMatched){
            resp.send({message: 'Login is Successfull', alert: true, data:sendData, isPasswordMatched: isPasswordMatched});
        }
        else{
            resp.send({message: 'Invalid password', alert: false, isPasswordMatched: isPasswordMatched });
        }
    }
    else{
        resp.send({message: "User not Registered! Please SignUp", alert: false})
    }
});

//---------------------------------------------------------------------------------------------------
// Product Section

const schemaProduct = mongoose.Schema({
    productName : String,
    category : String,
    productImage : String,
    price : String,
    description : String
});

const productModel = mongoose.model("products", schemaProduct);

//api to save product from newProduct
app.post("/uploadProduct", async (req, resp)=>{
    const data = new productModel(req.body);
    const save = await data.save();
    resp.send({message:"Uploaded successfully"})
});

//api to fetch all the product saved
app.get("/products", async (req, resp)=>{
    const data = await productModel.find();
    resp.send(data);
})


app.listen(PORT, () => console.log('callback fxn'));