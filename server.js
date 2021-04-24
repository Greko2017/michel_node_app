const express = require('express');
const fileUpload = require('express-fileupload');
var csv = require('csv-parser');
var fs = require('fs');
const router = express.Router();

const result = []
const app = express();

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  console.log(`server backend:>>`)
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  let gl_date_key =''
  let actual_amount_key =''
  file.mv(`${__dirname}/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    fs.createReadStream(`${__dirname}/${file.name}`)
    .pipe(csv({ separator: ';' }))
    .on('data', (data)=>{
      // console.log(`data`, data)
      
      result.push(data)
    })
    .on('headers', (headers) => {
      // console.log(`First header: ${headers[0]}`)
      gl_date_key= headers[0].toString()
      actual_amount_key= headers[4].toString()
    })
    .on('end',()=>{
      // console.log(`result:>>`, result)
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}`,CsvDataList:result, gl_date_key,actual_amount_key});
    })
  });
});


// Upload Endpoint
router.get('/data/', (req, res) => {
  const file_name = req.params.file_name;
  console.log('In server get file_name :>> ', file_name);
  let gl_date_key =''
  let actual_amount_key =''
  if (file_name === null) {
    return res.status(400).json({ msg: 'No file provided' });
  }

  
  var file = `${__dirname}/${file_name}`


  fs.createReadStream(`${__dirname}/${file.name}`)
  .pipe(csv({ separator: ';' }))
  .on('data', (data)=>{
    result.push(data)
  })
  .on('headers', (headers) => {
    gl_date_key= headers[0].toString()
    actual_amount_key= headers[4].toString()
  })
  .on('end',()=>{
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}`,CsvDataList:result, gl_date_key,actual_amount_key});
  })

  res.json({ msg:'Something when wrong'});
});

app.listen(5000, () => console.log('Server Started...'));
