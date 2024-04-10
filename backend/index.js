// port on which express.js will be running
const port = process.env.port || 4000;
//initialise the packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
//include the path from express servers
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const BASE_URL = process.env.BASE_URL



// database connection with MongoDB
mongoose.connect("mongodb+srv://nidhijoshi:Mongoose_eagle@cluster0.0gpq5lt.mongodb.net/e-commerce");


//API creation
app.get("/", (req, res)=>{
    res.send("Express App is running1")
})


// Image storage engine
const storage = multer.diskStorage({
    destination: 'uploads/image',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})


//creating upload endpoint for images
app.use('/images',express.static('uploads/image'))
app.post("/upload", upload.single('product'), (req, res)=>{
    //response given to user will be in json format
    
    const host = req.get('host');

    res.json({
        success:1,
        image_url:`${BASE_URL}images/${req.file.filename}`
    })
})


//to upload object in mongoDB atlas
//Schema for creating products
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true, //if we try to upload any product without id of type number it won't be uploaded
    },
    name:{
        type: String,
        required:true, //if we try to upload any product without name it won't be uploaded
    },
    image:{
        type: String,
        required: true, //if we try to upload any product without image it won't be uploaded
    },
    category:{
        type: String,
        require: true,
    },
    new_price:{
        type: Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})
app.post('/addproduct', async(req, res)=>{
    //logic to generate id automatically
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    //to save in database
    await product.save();
    console.log("saved");

    //response for the frontend
    res.json({
        success:true,
        name: req.body.name,
    })
})


//Creating API for deleting products
app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})


// Creating API for getting all products
app.get('/allproducts', async(req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})


//Schema creating for user model
const Users = mongoose.model('Users', {
    name:{
        type:String,
    },
    email:{
        type:String,
        unique: true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    Date:{
        type:Date,
        default: Date.now,
    }
})


//Creating end point for registering the user
app.post('/signup', async(req, res)=>{
    
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false, errors:"Existing user found with same email address"})
    }
    let cart = {};
    for(let i =0; i<300; i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data ={
        user:{
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true, token})
})


//creating end point for user login
app.post('/login', async(req, res)=>{
    
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true, token});
        }
        else{
            res.json({success:false, errors:"Wrong Password"})
        }
    }
    else{
        res.json({success:false, errors:"Wrong email id"})
    }
})


//Creating end point for new collection
app.get('/newcollections', async(req, res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collections fetched");
    res.send(newcollection);
})


//Creating end point for popular category
app.get('/popularcategory', async (req, res)=>{
    let products = await Product.find({});
    let popularcollection = products.slice(0,4);
    console.log("Popular Collections fetched");
    res.send(popularcollection);
})


//Creating middleware to fetch user
const fetchUser = async(req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try{
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        }
        catch(error){
            res.status(401).send({errors:"Please authenticate using a valid token"})
        }
    }
}


//Creating end point for adding products in cartdata
app.post('/addtocart',fetchUser, async(req, res)=>{
    console.log("added", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added")
})     


//creating end point to remove product from cart data
app.post('/removefromcart', fetchUser, async(req, res)=>{
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removed")
})


//creating endpoint to get cartdata
app.post('/getcart', fetchUser, async(req,res)=>{
    console.log("getCart");
    let userData =await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
    
})


app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port "+port)
    }
    else{
        console.log("Error : "+error)
    }
});
