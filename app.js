const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
const bcrypt = require('bcrypt');
const pool = require('./database');
const registerRoute = require('./routes/register');
const uploadRoute = require('./routes/upload');
const checkRoute = require('./routes/check');
const pointsRoute = require('./routes/points');
const withdrawRoute = require('./routes/withdraw');
const { ethers } = require('ethers');const app = express();
const helmet = require('helmet');
app.use(helmet());
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// Session configuration
app.use(session({
  secret: 'your-strong-secret-key',
  resave: false,
  saveUninitialized: false,
  // Add a session store here if needed
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      // Authenticate user and retrieve user data including role from the database
      const user = await pool.query('SELECT id, username, password, role FROM users WHERE username = $1', [username]);

      if (!user.rows.length) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const validPassword = await bcrypt.compare(password, user.rows[0].password);

      if (!validPassword) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      // Successfully authenticated, set the user role in the session
      return done(null, user.rows[0]);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await pool.query('SELECT id, username, role FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
  } catch (error) {
    done(error);
  }
});

const upload = multer({ dest: 'uploads/' });

app.use('/', registerRoute);
app.use('/', uploadRoute);
app.use('/', checkRoute);
app.use('/', pointsRoute);
app.use('/', withdrawRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
