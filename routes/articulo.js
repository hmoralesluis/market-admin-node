const router = require('express').Router();
const Articulo = require('../models/articulo');
const config = require('../config/secret');
const fs = require('fs');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './upload' });

//Middleware para obtener el name del articulo
async function getArticulo(req, res, next) {
  const findname = req.params.name
  try {
    articulo = await Articulo.findOne({name: findname})
    if (articulo == null) {
      return res.json({ resp: false})
    }
  } catch(err){
    return res.json({message: err.message})
  }

  res.articulo = articulo
  next()
}


// Get all articulos
router.get('/getallarticulos', async(req, res) => {
    try {
        const articulos = await Articulo.find()
        res.json({resp: true, articulos: articulos})
      } catch (err) {
        res.json({resp : false,message: err.message})
      }
})


// Create one Articulo
router.post('/uploadarticulo/:name', multipartMiddleware, async (req, res) => {
    const name =req.params.name; 
	const extension = req.params.extension;
	const pathTemp = req.files.uploads[0].path;
	const pathLocal =   'upload/' + name;
	
    const articulo = new Articulo({
      name: name,
      url: config.uploadaccess + name
      
    })
	
	fs.rename(pathTemp, pathLocal, function(err){
        if(err) res.json({resp: false});
      }); 
  
    try {
      const newarticulo = await articulo.save()
      res.json({resp: true, articulo: newarticulo})
    } catch (err) {
      res.json({ resp: true,message: err.message })
    }
  })

// Get one Articulo
router.get('/getarticulo/:name', getArticulo, (req, res) => {
    res.json(res.articulo)
})

// Update one Articulo
router.put('/updatearticulo/:name/:nameupdate', getArticulo, async(req, res) => {
  if (req.params.name != null) {
    res.articulo.name = req.params.nameupdate
    res.articulo.url = config.uploadaccess + req.params.nameupdate

    pathTemp =  'upload/' + req.params.name;
    pathLocal =  'upload/' + req.params.nameupdate;

    fs.rename(pathTemp, pathLocal, function(err){
      if(err) res.json({resp: false});
    });
  }


 
      try {
        const updatedarticulo = await articulo.save()
        res.json({resp: true, articulo: updatedarticulo})
      } catch {
        res.json({resp: false, message: err.message })
      } 
    
})

// Delete one Articulo
router.delete('/deletearticulo/:name',getArticulo,  async(req, res) => {
    try {
        await res.articulo.remove()
        res.json({ resp: true})
      } catch(err) {
        res.json({resp: false,message: err.message })
      }
})


module.exports = router;