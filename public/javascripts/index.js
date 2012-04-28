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
var onLinkedInLoad = function () {
  var DataCollection = (function () {
    var init = function () {
      this._data = {};
      this._form = {};
    }
    init.prototype = {
      _addEvents: function (form) {
        form.find('textarea, input, select').bind('change', function (e) {
          var name = e.target.name,
            match = name.match(/([a-z]+)\-(\d+)-([a-z]+)(-([a-z]+))?/i);
          if (!match) {
            return;
          }
          if (match.length === 4) {
            this._data[match[1]][match[2]][match[3]] = e.target.value;
          }
          if (match.length === 6) {
            this._data[match[1]][match[2]][match[3]][match[5]] = e.target.value;
          }
        }.bind(this));
        form.find('textarea').bind('click', function (e) {
          var curr = jQuery(e.currentTarget);
          if(curr.attr('readonly') !== undefined) curr.removeAttr('readonly');
          else curr.attr('readonly', 'readonly');
        }).autosize();
      },
      _convertTime: function (time) {
        if (time === true) {
          time = new Date();
          return {
            year: time.getFullYear(),
            month: time.getMonth() + 1
          }
        }
        time.month = time.month || 1;
        return time;
      },
      _getPositions: function (values) {
        var positions = values.positions && values.positions.values || [],
          result = [];
        result = positions
          .filter(function (position) {
            return !!position.startDate
          })
          .map(function (position) {
            return {
              endDate: this._convertTime(position.isCurrent || position.endDate),
              startDate: this._convertTime(position.startDate),
              company: position.company.name,
              title: position.title
            }
          }.bind(this));
        return result;
      },
      _getSkills: function (values) {
        var skills = values.skills && values.skills.values || [],
          result;
        result = skills.map(function (skill) {
          return skill.skill.name;
        })
        return result;
      },
      form: function (callback) {
        jQuery.get('/ajax/form', {
          query: JSON.stringify(this._data) 
        }, function (html) {
          var form = jQuery(html);
          this._form = form;
          this._addEvents(this._form);
          callback(this._form);
        }.bind(this));
      },
      timeline: function () {
        var result = [];
        ['positions'].forEach(function (key) {
          result = result.concat(result, this._data[key]);
        }.bind(this));
        return result;
      },
      rawToData: function (raw) {
        var values = raw.values[0],
          result = {};
        console.log(raw);
        result.me = {
          firstName: values.firstName,
          lastName: values.lastName,
          location: values.location.name
        };
        result.positions = this._getPositions(values);
        result.skills = this._getSkills(values);
        console.log(result);
        this._data = result;
      },
    }
    return new init();
  })();
  IN.Event.on(IN, 'auth', function () {
    IN.API.Profile('me')
      .fields('positions', 'educations', 'first-name', 'last-name', 'skills', 'location', 'summary')
      .result(function (data) {
        DataCollection.rawToData(data);
        DataCollection.form(function (form) {
          jQuery('body').append(form);
        });
      })
  })
}
