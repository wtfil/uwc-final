
/*
 * GET home page.
 */

module.exports = {
  index: function(req, res){
    res.render('index', { title: 'Express' })
  },
  getForm: function (req, res) {
    var get = req.query,
      query = JSON.parse(get.query);
    query.layout = false;
    res.render('form', query);
  }
}
