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
	var xmlreader = __meteor_bootstrap__.require('xmlreader');
	xmlreader.read(blob, function (err, res){
            if(err) return console.log(err);
            for(var i = 0; i < res.set.item.count(); i++){
		var name = res.set.item.at(i).name.text();
                var value = res.set.item.at(i).value.text();
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
