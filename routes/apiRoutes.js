const express = require('express');
const router = express.Router();

//get the comment from the db
router.get('/comment', function(req, res){
	res.send({type: "GET"});
});

//add a comment to the db
router.post('/comment', function(req, res){
	res.send({type: "POST"});
});


//update a comment in the db
router.put('/comment/:id', function(req, res){
	res.send({type: "PUT"});
});


//DELETE a comment from the db
router.delete('/comment/:id', function(req, res){
	res.send({type: "DELETE"});
});

module.exports = router;