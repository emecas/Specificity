// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Lists.find().count() < 10) {
    var data = [
      {name: "Meteor Principles",
       contents: [
         ["Data on the Wire","0.1", "Simplicity", "Better UX", "Fun"],
         ["One Language","0.1", "Simplicity", "Fun"],
         ["Database Everywhere","0.1", "Simplicity"],
         ["Latency Compensation","0.1", "Better UX"],
         ["Full Stack Reactivity","0.1", "Better UX", "Fun"],
         ["Embrace the Ecosystem","0.1", "Fun"],
         ["Simplicity Equals Productivity","0.1", "Simplicity", "Fun"]
       ]
      },
      {name: "Languages",
       contents: [
         ["Lisp","0.2", "GC"],
         ["C","0.2", "Linked"],
         ["C++","0.2", "Objects", "Linked"],
         ["Python","0.2", "GC", "Objects"],
         ["Ruby","0.2", "GC", "Objects"],
         ["JavaScript","0.2", "GC", "Objects"],
         ["Scala","0.2", "GC", "Objects"],
         ["Erlang","0.2", "GC"],
         ["6502 Assembly","0.2", "Linked"]
         ]
      },
      {name: "Favorite Scientists",
       contents: [
         ["Ada Lovelace","0.3", "Computer Science"],
         ["Grace Hopper", "0.3", "Computer Science"],
         ["Marie Curie", "0.3", "Physics", "Chemistry"],
         ["Carl Friedrich Gauss", "0.3", "Math", "Physics"],
         ["Nikola Tesla", "0.3", "Physics"],
         ["Claude Shannon", "0.3", "Math", "Computer Science"]
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
