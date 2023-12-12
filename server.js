import express from "express"
import session from "express-session"
import passport from "passport"
import FacebookStrategy from "passport-facebook"
import Routes from "./routes/routes.js"
import { config } from "./config.js"

const app = express()

app.set("view engine", "ejs")

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET"
}))

app.use(passport.initialize())

app.use(passport.session())

passport.serializeUser((user, cb) => {
    cb(null, user)
})

passport.deserializeUser((obj, cb) => {
    cb(null, obj)
})

passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL
  },
  function (_accessToken, _refreshToken, profile, done) {
    return done(null, profile);
  }
));

app.use("/", Routes)

const port = 3000

app.listen(port, () => {
    console.log("Servidor funcionando!!!")
})