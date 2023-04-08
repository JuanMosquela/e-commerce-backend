import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      callbackURL: "https://fit-commerce-api.onrender.com/auth/google",
      passReqToCallback: true,
    },
    function (accessToken, refreshToken, profile, callback) {
      console.log(profile);
      callback(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
