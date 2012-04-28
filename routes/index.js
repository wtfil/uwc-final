var fs = require('fs');
var path = require('path');
/*
 * GET home page.
 */

module.exports = {
  index: function(req, res){
    res.render('index', { title: 'Express' })
  },
	create: function(req,res){
		var list = JSON.parse(req.query.json)
		var fileContent = {
			timeline:{
				headline:"Johnny B Goode",
				type:"default",
				startDate:"2000,1",
				text:"<i><span class='c1'>Designer</span> & <span class='c2'>Developer</span></i>",
				asset:{
					media:"assets/img/notes.png",
					credit:"<a href='http://dribbble.com/shots/221641-iOS-Icon'>iOS Icon by Asher</a>",
					caption:""
				},
				date: []
			}
		}
		list.forEach(function(elem){
			elem.asset = {};
			fileContent.timeline.date.push(elem);
			console.log(elem.startDate);
		});
		console.log(fileContent);
		fs.writeFile(path.normalize(__dirname + '/../public/data1.json'), JSON.stringify(fileContent), function(err) {
				if(err) {
						console.log(err);
				} else {
					console.log("The file was saved!");
					res.json({status:'success'})
				}
		}); 
	},
  getForm: function (req, res) {
    var get = req.query,
      query = JSON.parse(get.query);
    query.layout = false;
    res.render('form', query);
  }
}
