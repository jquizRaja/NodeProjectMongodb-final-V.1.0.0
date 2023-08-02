const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../model/user-model");

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      //options for the google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      //check user already exists
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          //already have the user
          console.log("User is:", currentUser);
        } else {
          //if not create user in DB
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log("New User Created:", newUser);
            });
        }
      });
    }
  )
);
