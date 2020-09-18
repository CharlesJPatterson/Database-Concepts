var con = require('./connection')
var express = require('express');
var router = express.Router();


router.get('/api/blocks', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query("SELECT * FROM blocks", function (err, result, fields) {	
			res.send(JSON.stringify(result)); 
		});
	});
});


router.get('/api/blocked', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
        response.conn.query(`SELECT * FROM blocks where blocked = ${req.body.blocked}`,
         function (err, result, fields) {	
			res.send(JSON.stringify(result)); 
		});
	});
});


router.get('/api/blocker', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
        response.conn.query(`SELECT * FROM blocks where blocker = ${req.body.blocker}`,
         function (err, result, fields) {	
			res.send(JSON.stringify(result)); 
		});
	});
});


router.delete('/api/blocks', async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
        response.conn.query(`delete from blocks where blocker = ${req.body.follower} AND 
        blocked = ${req.body.blocked}`,function (err, result, fields) {
					res.send(JSON.stringify(result)); 
		});
	});
});



router.post('/api/blocks',async (req, res) => {
	con.getConnection(res, (response) => {
		if (response.message == 'fail') return;
		response.conn.query(`INSERT INTO blocks (blocker,blocked) VALUES 
        (${req.body.blocker},${req.body.blocked});`,function (err, result, fields) {
					res.send(JSON.stringify(result)); 
		});
	});
});




module.exports = router;