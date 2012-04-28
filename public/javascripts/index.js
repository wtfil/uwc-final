var onLinkedInLoad = function () {
  var DataCollection = (function () {
    var init = function () {
      this._data = {};
      this._form = {};
    }
    init.prototype = {
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
      _addEvents: function (form) {
        form.find('input, select').bind('change', function (e) {
          var name = e.target.name,
            match = name.match(/([a-z]+)\-(\d+)-([a-z]+)/i);
          if (!match) {
            return;
          }
          this._data[match[1]][match[2]][match[3]] = e.target.value;
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
        result.positions = this._getPositions(values);
        this._data = result;
      },
      _getPositions: function (values) {
        var positions = values.positions && values.positions.values || [],
          result = [];
        result = positions.map(function (position) {
          return {
            endDate: position.isCurrent ? Date.now() : position.endDate,
            startDate: position.startDate ,
            company: position.company.name,
            title: position.title
          }
        });
        return result;
      }

    }
    return new init();
  })();
  IN.Event.on(IN, 'auth', function () {
    IN.API.Profile('me')
      .fields('positions')
      .result(function (data) {
        DataCollection.rawToData(data);
        DataCollection.form(function (form) {
          jQuery('body').append(form);
        });
        console.log(DataCollection.timeline());
      })
  })
}
