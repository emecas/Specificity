/**
 * TODO support other encodings:
 * http://stackoverflow.com/questions/7329128/how-to-write-binary-data-to-a-file-using-node-js
 */



Meteor.methods({
    saveFile: function(blob, name, path, encoding,activeListID) {
        var path = cleanPath(path), fs = __meteor_bootstrap__.require('fs'),
        name = cleanName(name || 'file'), encoding = encoding || 'binary',
        chroot = Meteor.chroot || 'public';
        path = chroot + (path ? '/' + path + '/' : '/');
	
        //var xmlreader = __meteor_bootstrap__.require('xmlreader');

    var require = __meteor_bootstrap__.require;
    var fs = require('fs');
    var path = require('path');
    var base = path.resolve('.');
    var isBundle = fs.existsSync(base + '/bundle');
    var modulePath = base + (isBundle ? '/bundle/static' : '/public') + '/node_modules';
    var xmlreader  = require(modulePath + '/xmlreader');



	xmlreader.read(blob, function (err, res){
            if(err) return console.log(err);
            for(var i = 0; i < res.set.item.count(); i++){
		var name = res.set.item.at(i).name.text();
                var text = res.set.item.at(i).value.text();
		var value = parseFloat(text);
                Fiber(
		    function() {
				Todos.insert({
				    text: name,
				    value: value,  
				    list_id: activeListID,
				    done: false,
				    timestamp: (new Date()).getTime(),
				    tags: []//tag ? [tag] : []
				});
                     }
		).run();
	    }

        });
	function cleanPath(str) {
            if (str) {
                return str.replace(/\.\./g,'').replace(/\/+/g,'').
                replace(/^\/+/,'').replace(/\/+$/,'');
            }
	}
	function cleanName(str) {
            return str.replace(/\.\./g,'').replace(/\//g,'');
        }
    }
    
});


