/**
 * TODO support other encodings:
 * http://stackoverflow.com/questions/7329128/how-to-write-binary-data-to-a-file-using-node-js
 */
Meteor.methods({
    saveFile: function(blob, name, path, encoding,activeListID) {
        var path = cleanPath(path), fs = __meteor_bootstrap__.require('fs'),
        name = cleanName(name || 'file'), encoding = encoding || 'binary',
        chroot = Meteor.chroot || 'public';
        // Clean up the path. Remove any initial and final '/' -we prefix them-,
        // any sort of attempt to go to the parent directory '..' and any empty directories in
        // between '/////' - which may happen after removing '..'
        path = chroot + (path ? '/' + path + '/' : '/');
    
    
        // TODO Add file existance checks, etc...



        fs.writeFile(path + name, blob, encoding, function(err) {
            if (err) {
                throw (new Meteor.Error(500, 'Failed to save file.', err));
            } else {
                console.log('The file ' + name + ' (' + encoding + ') was saved to ' + path);
                //console.log(fs);
                console.log(blob);  
                //fs.readFile();  


               

		////	Fiber(
		////	    function() {
		var xmlreader = __meteor_bootstrap__.require('xmlreader');

                xmlreader.read(blob, function (err, res){
                    if(err) return console.log(err);

                    // use .text() to get the content of a node:
                    ////console.log( res.response.text() );

                    // use .attributes() to get the attributes of a node:
                    ////console.log( res.response.attributes().shop );

                    console.log("");

                    // using the .count() and the .at() function, you can loop through nodes with the same name:
                    for(var i = 0; i < res.set.item.count(); i++){
                        var name = res.set.item.at(i).name.text();
                        var value = res.set.item.at(i).value.text();
                        //console.log( name  + "  " + value );
	
                        //var tag = Session.get('tag_filter');

			Fiber(
			    function() {

				//console.log("4L9pvrH2d9Xyy5xoK");
				//console.log(Session.get('list_id'));

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

                    console.log("");

                    // you can also use .each() to loop through the nodes of the same name:
                    ////res.response.who.each(function (i, who){
                    ////    console.log( who.text() );
                    ////});

                    console.log("");

                ////console.log( res.response.who.at(1).text() ) ;
                ////console.log( res.response.who.at(1).location.text() );

                // you can also use .at() to get to nodes where there's only one of them:
                ////console.log( res.response.note.at(0).text() );

                ////console.log("");

                // or loop through them as if they were a series of nodes with the same name:
                ////res.response.note.each(function (i, note){
                ////    console.log( note.text() );
                ////});

                ////console.log("");

                // you can also get the parent of a node using .parent():
                ////console.log( res.response.who.at(1).parent().attributes().id ) ;
                });

       ////    }
       ////).run();




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



}



);
