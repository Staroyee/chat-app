const express = require('express');
const exphbs = require('express-handlebars');
<<<<<<< HEAD
// const routes = require('./controllers');
// const helpers = require('./utils/helpers');
=======
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');
//const helpers = require('./utils/helpers');
const hbs = exphbs.create({});
var morgan = require('morgan');
var helmet = require('helmet');
>>>>>>> f7c5ef0b472727169c3822f8276a1d3c6aef0644

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

<<<<<<< HEAD
// const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    // store: new SequelizeStore({
    //   db: sequelize
    // })
  };

app.use(session(sess));

// app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(routes);
=======
app.use(morgan('combined'));
app.use(helmet());
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

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
>>>>>>> f7c5ef0b472727169c3822f8276a1d3c6aef0644

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
