const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
// const {getAuth} =require("firebase/auth")
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });

  const firebaseConfig = {
    apiKey: "AIzaSyAeBcrCnD13AILd7lGwIV8AYFlWNFbMqVs",
    authDomain: "big-besket.firebaseapp.com",
    projectId: "big-besket",
    storageBucket: "big-besket.appspot.com",
    messagingSenderId: "650648742875",
    appId: "1:650648742875:web:4d02f4b2682d63654115fe"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// const auth = getAuth(app)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true
  },
  // isAdmin: {
  //   type: Boolean,
  //   required: true
    
  // }
});
const User = mongoose.model("User", userSchema);


const cartSchema= new mongoose.Schema({
  userId: {
    type: String,
    required: true

  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true
  },
  price:{
    type: Number,
    required: true
    
  },
  category:{
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1 
  }
});

const Cart = mongoose.model("cart",cartSchema)

const orderItemSchema = new mongoose.Schema({
  
  price:{
    type: Number,
    required: true
    
  },
  category:{
    type: String,
    required: true
  },
  // image:{
  //   type: String,
  //   required: true
  // },
  quantity: {
    type: Number,
    required: true,
    min: 1 
  }
});

const orderSchema = new mongoose.Schema({

  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true

  },
  paymentStatus:{
    type:String,
     enum:["pending","completed","failed"],
    default:"pending"
   
},
paymentMethod:{
    type:String,
    enum:["card"],
    default:"card"
},

// paymentToken:String,
// paymentMode:String,
// currency:String,
paymentTime:Date,
// deliveryTime:Date,
  orders: [orderItemSchema] 
});
const Order = mongoose.model('Order', orderSchema);

const wishSchema= new mongoose.Schema({
  userId: {
    type: String,
    required: true

  },
  productId: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
    required: true
  }],
  price:{
    type: Number,
    required: true
    
  },
  discountprice:{
    type: Number,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true
  }
});
const Wish = mongoose.model("wish",wishSchema)


const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountprice:{
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
 
});

const Product = mongoose.model("Product", productSchema);

// const adminSchema = new mongoose.Schema({
//   username:String,
//   email:String,
//   password:String,
// })

// const Admin = mongoose.model("Admin",adminSchema)

module.exports = { User, Product,storage,Cart,Wish,Order};