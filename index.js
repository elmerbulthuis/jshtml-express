/*!
 * jshtml-express by Elmer Bulthuis <elmerbulthuis@gmail.com>
 */

var jshtml = require('jshtml');
var tools = require('./lib/tools');
var fs = require('fs');

module.exports = render;

var cache = {};

function render(path, options, callback){
	var fn = cache[path];
	var src;
	if(!fn){
		src = fs.readFileSync(path, 'utf-8');
		fn = compile(src, options);
	}
	try{
		var result = fn(options);
		if(callback) callback(null, result);
		else return result;			
	}
	catch(err){
		if(callback) callback(err, null);
		else throw err;
	}

}//render


function compile(src, options){
	src = jshtml.parse(src);
	src = 'with(locals){' + src + '}';

	var fn = new Function('write', 'end', 'tag', 'tools', 'locals', src);

	return function(options) {
		var result = '';

		fn.call(options.scope, write, end, tag, tools, options._locals);

		return result;

		function tag(tagName) {
			var tagAttributeSetList = [];
			var tagContentList = [];
			var argumentCount = arguments.length;
			var hasContent = false;
			for(var argumentIndex = 1; argumentIndex < argumentCount; argumentIndex++){
				var argument = arguments[argumentIndex];
				switch(typeof argument) {
					case 'object':
					tagAttributeSetList.push(argument);
					break;

					default:
					hasContent = true;
					tagContentList.push(argument);
				}
			}

			write('<', tagName);
			tagAttributeSetList.forEach(function(tagAttributeSet) {
				write(' ', tools.htmlAttributeEncode(tagAttributeSet));
			});
			if(hasContent) {
				write('>');

				tagContentList.forEach(function(tagContent) {
					switch(typeof tagContent) {
						case 'function':
						tagContent();
						break;

						default:
						write(tools.htmlLiteralEncode(tagContent));
					}
				});

				write('</', tagName, '>');
			}
			else{
				write(' />');
			}
		}

		function writePartial() {
			write(locals.partial.apply(options.scope, arguments));
		}//writePartial

		function writeBody() {
			write(locals.body);
		}//writeBody

		function write(){
			var argument;
			var argumentIndex;
			var argumentCount = arguments.length;		
			for(var argumentIndex = 0; argumentIndex < argumentCount; argumentIndex++){
				argument = arguments[argumentIndex];
				result += tools.str(argument)
			}
		}//write

		function end(){
			write.apply(this, arguments);
		}//end

	};

}//compile


