const router = require('express').Router();
const store = require('../db/store');

router.get('/notes', (req, res)=>{
    store.getNotes().then((data)=>{
        return res.json(data)
    }).catch((err)=> res.status(500).json(err))
})
//erroring out on promise. 
module.exports = router;