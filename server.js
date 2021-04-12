const express = require('express');
const fileUpload = require('express-fileupload');
var csv = require('csv-parser');
var fs = require('fs');

const result = []
const app = express();

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    fs.createReadStream(`${__dirname}/client/public/uploads/${file.name}`)
    .pipe(csv({ separator: ';' }))
    .on('data', (data)=>{
      console.log(`data`, data)
      let tmp = {
        gl_date:data['GL Date'],
        abr:data['Abr'],
        parent_acc_nature_view:data['Parent Account for Nature View'],
        currency:data['Currency'],
        actual_amount:data['Actual\nAmount']
      }
      result.push(tmp)
    })
    .on('end',()=>{
      console.log(`result`, result)
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}`,CsvDataList:result });
    })

  });
});

// Upload Endpoint
app.get('/data', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});


app.listen(5000, () => console.log('Server Started...'));
