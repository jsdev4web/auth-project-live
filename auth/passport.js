const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const pool = require("../db/pool");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");


const loginApp = passport => {
    passport.use(
        
        new LocalStrategy(async (email, password, done) => {
          try {
            const { rows } = await pool.query("SELECT * FROM signups WHERE email = $1", [email]);
            const user = rows[0];
            console.log(user)
      
            if (!user) {
              return done(null, false, { message: "Incorrect username" });
            }
            const match = await bcrypt.compare(password, user.password);
            //if (user.password !== password) {
            if(!match) {
              return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
          } catch(err) {
            return done(err);
          }
        })
      );
    
    
      passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser(async (id, done) => {
        try {
          const { rows } = await pool.query("SELECT * FROM signups WHERE id = $1", [id]);
          const user = rows[0];
      
          done(null, user);
        } catch(err) {
          done(err);
        }
      });
    }
    
    
    module.exports = {
      loginApp,
    };