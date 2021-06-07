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
// app.use(express.static(path.join(__dirname, 'vue-whiskey-community/dist')));


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