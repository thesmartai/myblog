var express = require('express');
var router = express.Router();








var info=Array()
var id=0;






/* GET home page. */
router.get('/newpost', function(req, res, next) {
  res.render('blog');
});

/* GET home page. */
router.get('/', function(req, res, next) {
res.send(info);
});

/* GET home page. */
router.post('/', function(req, res, next) 
{

info.push({'id':id, 'title':req.body.title, 'date':req.body.datum, 'name':req.body.benutzername,'text':req.body.text});  
id=id+1;
res.send("done!");


});

/* GET home page. */
router.get('/:id', function(req, res, next) 
{
res.send(info[req.params.id]);

});



























module.exports = router;
