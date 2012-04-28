var onLinkedInLoad = function () {
  IN.Event.on(IN, 'auth', function () {
    IN.API.Profile('me').result(function () {
			var TimeLine = (function(){
				var timeLine = function(arrayOfDates){
					var self = this;
					self.createFile(arrayOfDates,function(data){
						self.init();
					});
				}
				timeLine.prototype = {
					init: function(){
						var self = this;
						$(function(){
							var timeline = new VMM.Timeline();
							timeline.init('data1.json');
						});
					},
					createFile: function(json, callback){
						var self = this;
						$.get('/ajax/create/?json=' + JSON.stringify(json), function(data){
								callback(data);
						});
					}
				} 
				return new timeLine([{
						startDate:'2001,4',
						headline:'Developed an iPad newspaper applicationttittle',
						text:'Developed an iPad newspaper applicationblabla'
						},
						{startDate:'2010,8',
						headline:'Developed an iPad newspaper applicationttittle',
						text:'Developed an iPad newspaper applicationblabla'
						}]
				);
			})();
    })
  })
}
