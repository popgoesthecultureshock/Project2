var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('./models/user')

passport.use(
  new GoogleStrategy(
    // Configuration object
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    // The verify callback function...
    // Marking a function as an async function allows us
    // to consume promises using the await keyword
    async function (accessToken, refreshToken, profile, cb) {
      // When using async/await to consume promises,
      // there is no use of .then or .catch, so we
      // use a try/catch block to handle an error
      try {
        // A user has logged in with OAuth...
        // Instead of using promise.then with a callback,
        // we can use the await keyword followed by the promise.
        // When that promise is fulfilled, it will return
        // whatever the promise's resolved value is.
        let user = await User.findOne({ googleId: profile.id })
        // Existing user found, so provide it to passport
        if (user) return cb(null, user)
        // We have a new user via OAuth!
        user = await User.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value
        })
        return cb(null, user)
      } catch (err) {
        return cb(err)
      }
    }
  )
)
passport.serializeUser(function (user, cb) {
  cb(null, user._id)
})
passport.deserializeUser(async function (userId, cb) {
  cb(null, await User.findById(userId))
  // The above async/await code replaces this code
  // User.findById(userId).then(function(user) {
  //   cb(null, user);
  // });
})

app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
