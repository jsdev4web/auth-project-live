const path = require("node:path");
const express = require("express");
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;

const { loginApp } = require("./auth/passport")
loginApp(passport);
 

const indexRouter = require("./routes/indexRouter");
const aboutRouter = require("./routes/aboutRouter");
const contactRouter = require("./routes/contactRouter")

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(session({ secret: "cats", resave: false, saveUninitialzied: false}));// what is this?
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


app.use("/", indexRouter);
app.use("/about", aboutRouter);
app.use("/contact", contactRouter);

const links = [
    { href: "/", text: "Home" },
    { href: "about", text: "About" },
    { href: "contact", text: "Contact" },
];

const PORT = 3000;
app.listen(PORT, () => {
    console.log( "My first Express server live on port " + PORT )
})

exports.links = links