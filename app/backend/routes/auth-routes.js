const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);
//callback route for google to redirect to
router.get("/google/redirect", passport.authenticate('google'),(req, res) => {
  res.send("You have reached the callback URI");
});

router.get("/logout", (req, res) => {
  //handle with passport
  res.send("logging out");
});

module.exports = router;
