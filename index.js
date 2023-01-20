const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/index.html'))
})

app.get('/meta-form',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/form.html'))
})

app.post('/meta-form',(req,res)=>{
    console.log(req.body);
})

app.listen(3000, () =>
  console.log('Visit http://127.0.0.1:3000')
);