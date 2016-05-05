var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.set('port', (process.env.PORT || 3000));
app.set('trust proxy', true);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/dist'));

app.use('/', require('./routes/home'));
app.use('/api', require('./routes/api'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
