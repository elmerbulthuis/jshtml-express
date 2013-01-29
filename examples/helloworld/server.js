var express = require('express');

var port = parseInt(process.argv.pop());
var app = express();
app.configure(function() {
	app.use(express.bodyParser());
	app.use(app.router);
});

app.engine('jshtml', require('../../.'));
app.set('view engine', 'jshtml');


app.get('/', function(req, res) {
	res.locals({
		title: 'Hello'
		, message: 'Hey world'
	});

	res.render('message');
});

app.listen(port);
console.log('helloworld running at port ' + port);



