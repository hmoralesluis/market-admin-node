const router = require('express').Router();
const Admin = require('../models/admin');
const admin = require('../models/admin');




// Create Admin
router.post('/createadmin', async (req, res) => {
    
    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      keepsession: req.body.keepsession
      
    })
  
    try {
      const newadmin = await admin.save()
      res.json({resp: true, admin: newadmin})
    } catch (err) {
      res.json({ resp: true, message: err.message })
    }
  })


// Get Admin
router.get('/getadmin', async(req, res) => {
    try {
        const myadmin = await Admin.findOne({enabled: true})
        res.json({resp: true, admin: myadmin})
      } catch (err) {
        res.json({resp : false,message: err.message})
      }
})

// Get e-mail
router.get('/getemail/:name', async(req, res) => {
  const findname = req.params.name
    try {
        const admin = await Admin.findOne({name: findname})
        const email = admin.email
        res.json({resp: true, email: email})
      } catch (err) {
        res.json({resp : false,message: err.message})
      }
})

// Update password
router.put('/updatepassword', async(req, res) => {
  const findemail = req.body.email
    try {
         admin = await Admin.findOne({email: findemail})
         admin.password = req.body.newpassword
        const updateadmin = await res.admin.save()
        res.json({resp: true, admin: updateadmin})
      } catch {
        res.json({resp: false, message: err.message })
      } 
    
})


// Get password
router.get('/getpassword/:email', async(req, res) => {
	const findemail = req.params.email; 
  try {
      const admin = await Admin.findOne({email:findemail})
      const password = admin.password
      res.json({resp: true, password: password})
    } catch (err) {
      res.json({resp : false,message: err.message})
    }
})

//Check Email
/**
 * Function to check is an email is in Use
 * Params: Email: String
 * Return: True | False
 */
// router.post('/checkemail/:email', async(req, res) => {
// 	const findemail = req.params.email; 
//   try {
//      
//       const admin = await Admin.findOne({email:findemail})
//       if (admin) {
//         res.json({resp: true})
//       }
      
//     } catch (err) {
//       res.json({resp : false,message: err.message})
//     }
// })

router.post('/checkemail/:email', function(req, res, next){
  const findemail = req.params.email; 
  Admin.findOne({email: findemail}, function(err, admin){
      if(err) return next(err);
      if(admin)
       res.json({resp: true});
       else
       res.json({resp: false});
  });   
});

// Set enabled
router.put('/setenabled/:email', async(req, res) => {
  const findemail = req.params.email; 
  try {
    Admin.collection.updateMany({},{ $set: {enabled: false} } , { multi: true });
    Admin.collection.updateOne({email:findemail },{ $set: {enabled: true} });
      res.json({resp: true})
      
    } catch (err) {
      res.json({resp : false,message: err.message})
    }
})

module.exports = router;