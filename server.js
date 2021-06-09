const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const { Food } = require("./models/Food");

// Initialize the app
const app = express();
// Middlewares
// Form Data Middleware


// Json Body Middleware
app.use(express.json());

// Cors Middleware
app.use(cors());

// Seting up the static directory
app.use(express.static(path.join(__dirname, 'foodprint/dist')));


//Mongoose 로 DB 접속
const config = "mongodb+srv://whiscovery:wjdwlsdnr5728@cluster0.ngeoi.mongodb.net/foodprint?retryWrites=true&w=majority"
var db = mongoose.connect(config, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch(err => {
      console.log(`Unable to connect with the database ${err}`)
  });



// Port 오픈
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

app.post('/transit', (req, res) => {
    console.log("구글->몽고 변환 접근");
    const food = new Food(req.body);
    food.save((err, foodInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

app.get('/foods', (req, res, next) => {
    Food.find()
    .then( (datas) => {
      res.json(datas);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
  })
app.get('/foods/:location', (req, res, next) => {
  Food.find({ 위치: req.params.location }, (err, data) => {
    if(err) return res.status(500).json({error: err});
    if(!data) return res.status(404).json({error: 'Not found'});
    res.json(data);
  })
})

app.post('/writepost', (req, res) => {
  console.log("writepost 삽입 접근");
  const food = new Food(req.body);
  food.save((err, foodInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

  // /로 get 요청
app.get('/', function(req, res) { 
  res.sendFile(path.join(__dirname, './foodprint/dist/index.html'));
});
app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname, './foodprint/dist/index.html'));
});