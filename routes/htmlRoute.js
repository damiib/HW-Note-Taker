const path = require('path');
const router = require('express').Router();

//we need to create a route that goes to localhost:3000/notes. it will genterate the notes.html page

router.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname,'../public/notes.html'))
});

// If no matching route is found default to index
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  module.exports = router;