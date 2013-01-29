# JsHtml

Master: [![Build Status](https://travis-ci.org/elmerbulthuis/jshtml-express.png?branch=master)](https://travis-ci.org/elmerbulthuis/jshtml-express)
Develop: [![Build Status](https://travis-ci.org/elmerbulthuis/jshtml-express.png?branch=develop)](https://travis-ci.org/elmerbulthuis/jshtml-express)

jshtml adapter for express

checkout https://github.com/elmerbulthuis/jshtml for info on jshtml.


## Installation
	
	npm install jshtml-express


## Express

Install express and jshtml-express:
	
	npm install express
	npm install jshtml-express
	

Create a simple server (/server.js):
	
	var express = require('express');

	var port = parseInt(process.argv.pop());
	var app = express();
	app.configure(function() {
		app.use(express.bodyParser());
		app.use(app.router);
	});

	app.engine('jshtml', require('jshtml-express'));
	app.set('view engine', 'jshtml');


	app.get('/', function(req, res) {
		res.locals({
			title : 'Test!'
			, message : 'De groeten'
		});

		res.render('index');
	});

	app.listen(port);
	console.log('helloworld running at port ' + port);


Create an index template (/views/index.jshtml):
	
	<html>
	<head>
	<title>jshtml</title>
	</head>
	
	<body>

	<h1>@locals.title</h1>
	<p>
	@locals.message
	</p>

	</body>
	</html>


Start your server:
	
	node server.js 8080


Browse to:
	
	http://localhost:8080


Result:
	
	<html> 
	<head> 
	<title>jshtml</title> 
	</head> 
	 
	<body> 
	<h1>Test!</h1> 
	<p> 
	De groeten
	</p> 
	 
	</body> 
	</html>




## License 

Copyright (c) 2013 Elmer Bulthuis <elmerbulthuis@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
