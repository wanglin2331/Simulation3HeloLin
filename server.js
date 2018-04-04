const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

const isAuthenticated = require("./isAuthenticated");
const Controller = require("./controller");

require("dotenv").config();

const app = express();
const port = 3001;

massive(process.env.CONNECTION_STRING).then(db => {
    app.set("db", db);
  });
  
  app.use(bodyParser.json());
  app.use(cors());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: true,
      resave: false
    })
  );

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new Auth0Strategy(
      {
        domain: process.env.AUTH_DOMAIN,
        clientID: process.env.AUTH_CLIENT_ID,
        clientSecret: process.env.AUTH_CLIENT_SECRET,
        callbackURL: process.env.AUTH_CALLBACK,
        scope: "profile email"
      },
      (accessToken, refreshToken, extraParams, profile, done) => {
        // console.log(111111111,profile);
        
        const db = app.get("db");
        db.get_user_by_auth_id({ auth_id: profile._json.email }).then(results => {
          let user = results[0];
  
          if (user) {
            return done(null, user);
          } else {


            let userObj = {
              name: profile.displayName,
              email: profile._json.email,
              auth_id: profile._json.email
            };
            db.create_user(userObj).then(results => {
              let user = results[0];
              return done(null, user);
            });
          }

          
        });
      }
    )
  );


passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const db = app.get("db");
  db.get_user_by_id({ id }).then(results => {
    let user = results[0];
    return done(null, user);
  });
});

app.get("/login", passport.authenticate("auth0"));
app.get(
  "/login/callback",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/dashboard",
    failureRedirect: "http://localhost:3000/#/login"
  })
);

app.get("/login/me", (req, res) => {
  // console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return res.send(req.user);
  } else {
    return res.status(404).send("user not authenticated");
  }
});

app.get("/api/allposts", isAuthenticated, Controller.getAll);
app.get("/api/ownposts", isAuthenticated, Controller.getOwn);
app.post("/api/allposts", isAuthenticated, Controller.create);


app.listen(port, () => {
console.log("listening on port", port);
});