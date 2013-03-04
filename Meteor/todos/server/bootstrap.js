// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Lists.find().count() === 0) {
    var data = [
      {name: "Meteor Principles",
       contents: [
         ["Data on the Wire",0.1, "Simplicity", "Better UX", "Fun"],
         ["One Language",0.2, "Simplicity", "Fun"],
         ["Database Everywhere",0.3, "Simplicity"],
         ["Latency Compensation",0.4, "Better UX"],
         ["Full Stack Reactivity",0.5, "Better UX", "Fun"],
         ["Embrace the Ecosystem",0.6, "Fun"],
         ["Simplicity Equals Productivity",0.7, "Simplicity", "Fun"]
       ]
      },
      {name: "Languages",
       contents: [
         ["Lisp",0.21, "GC"],
         ["C",0.22, "Linked"],
         ["C++",0.23, "Objects", "Linked"],
         ["Python",0.32, "GC", "Objects"],
         ["Ruby",0.42, "GC", "Objects"],
         ["JavaScript",0.432, "GC", "Objects"],
         ["Scala",0.442, "GC", "Objects"],
         ["Erlang",0.52, "GC"],
         ["6502 Assembly",0.62, "Linked"]
         ]
      },
      {name: "Favorite Scientists",
       contents: [
         ["Ada Lovelace",0.3, "Computer Science"],
         ["Grace Hopper", 0.3, "Computer Science"],
         ["Marie Curie", 0.31, "Physics", "Chemistry"],
         ["Carl Friedrich Gauss", 0.33, "Math", "Physics"],
         ["Nikola Tesla", 0.23, "Physics"],
         ["Claude Shannon", 0.23, "Math", "Computer Science"]
       ]
      }
    ];

    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var list_id = Lists.insert({name: data[i].name});
      for (var j = 0; j < data[i].contents.length; j++) {
        var info = data[i].contents[j];
        Todos.insert({list_id: list_id,
                      text: info[0],
		      value: info[1],
                      timestamp: timestamp,
                      tags: info.slice(2)});
        timestamp += 1; // ensure unique timestamp.
      }
    }
  }
});
