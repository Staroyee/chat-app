const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');
//const helpers = require('./utils/helpers');
const hbs = exphbs.create({});
var morgan = require('morgan');
var helmet = require('helmet');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


app.use(morgan('combined'));
app.use(helmet());
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
  res.header("Content-Security-Policy", "script-src 'self' https://cdn.jsdelivr.net");
  return next();
});
app.use( helmet({ contentSecurityPolicy: false }) );

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
