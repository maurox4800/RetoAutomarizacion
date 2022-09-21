const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
//const userRoute = require("./routes/user");
const bodyParser = require("body-Parser");
const emailler = require("./emailler")
//const {setHtmlMessage} = require("./emailler");
// settings
const app = express();
const port = process.env.PORT || 3000;

// middlewares
//app.use(express.json());
//app.use("/api", userRoute);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userSchema = mongoose.Schema({

  name:{
   type: String,
   required: true
  } ,
  email:{
    type:String,
    required: true
  },
   password:{
    type:String,
    required: true
   },

  inicio:{
    type: Date,
    required: true
  }
  
},{versionkey: false});

const usuario = mongoose.model("usuario", userSchema)


// routes
app.get('/', (req, res) =>{
  res.sendFile(__dirname + "/form.html");
});

app.post("/", function (req, res) {
  const newUser = new usuario({
    name: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
    inicio: req.body.inicio,
  });
  newUser.save();
  emailler.sendMail(newUser)
  res.redirect('/');
})
app.get('/users', (req, res) => {
  const date = new Date(req.query.fecha)
    usuario
    .find({date})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//para cargar el css
app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

//app.get("/us", function(req, res){
  //res.send('fecha: ' + req.query.inicio);
//});
// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));