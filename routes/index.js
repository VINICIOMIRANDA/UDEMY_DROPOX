var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/file', (req, res) => {

  let path = "./" + req.query.path;


  if (fs.existsSync(path)) {

    fs.readFile(path, (err, data)=>{

      if (err) {

        console.error(err);
        res.status(400).json({
          error: err
        });
      } else {

        res.status(200).end(data);
      }

    })

  } else {

    res.status(404).json({

      error: 'File not found.'
    });

  }

});



router.delete('/file', (req, res) => { //AULA 104

  let form = new formidable.IncomingForm({

    uploadDir: './upload',
    keepExtensions: true

  });

  form.parse(req, (err, fields, files) => {

    let path = "./" + fields.path;

    if (fs.existsSync(path)) { // Se o arquivo existe

      fs.unlink(path, err => {  // usado para remover arquivos fisicos unlink

        if (err) {
          res.status(400).json({
            err
          });

        } else {
          res.json({
            //files: files
            fields //AULA 104

          });

        }

      });

    } else {

      res.status(404).json({

        error: 'File not found.'
      });


    }

  });







});

router.post('/upload', (req, res) => {

  let form = new formidable.IncomingForm({

    uploadDir: './upload',
    keepExtensions: true

  });

  form.parse(req, (err, fields, files) => {


    res.json({
      //files: files
      files

    });
  });
  //  res.json(req.body);

});

module.exports = router;
