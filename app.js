const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParse = require('body-parser');
dotenv.config();
const PORT = process.env.PORT || 4600;
const roters = require('./Routes/routes');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParse.urlencoded({extended:false}));
app.use('/', roters);


app.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`);
});
