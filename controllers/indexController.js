
const links = require("../app");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");


const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

//where i set rules for data inputs
const validateUser = [
    body("firstname").trim()//trim removes whitespace
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
    body("lastname").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
    body("email").isEmail().trim(),
    body("password").trim().notEmpty()
        .isLength({min: 5, max: 12}).withMessage("password must be btw 5-12 character long")
        .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character'),
    body("member_status").trim()
        .isBoolean()
    ];

//pulls the index page and list the current db results
async function indexUserGet(req, res) {
  const users = await db.getAllUsers();
  const allMessages = await db.getAllMessages();
  const getMessages = await db.getMessages();
  console.log(users);
  console.log(allMessages);
  res.render("index", { 
    links: links.links,
    title: "User List",
    user: req.user,
    users: users,
    allMessages: allMessages,
    getMessages: getMessages
  });
}

//gets the sign up page
async function indexSignUpGet(req, res) {
    res.render("signUp", {
        title: "sign up",
    });
}


const indexSignUpPost = async function(req, res, next){

  try {
    body('password').notEmpty().withMessage('Password is required'),
    body('confirm').notEmpty().withMessage('Confirm password').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match');
        }
        return true;
      })
  } catch(err) {
    return next(err)
  }


  try {
    validateUser,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("signUp", {
          title: "Sign Up",
          errors: errors.array(),
        });
      }
    }
  } catch(err) {
    return next(err)
   }


   try { 
      const { firstname, lastname, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(req.body.password, 10);  //remove if breaks app
      await pool.query("insert into signups ( firstname, lastname, email, password) values ($1, $2, $3, $4)", [req.body.firstname, req.body.lastname, req.body.email, hashedPassword]); //remove if breaks app
      res.redirect("/");
   } catch(err) {
    return next(err)
   }
  }


async function indexUpdateGet(req, res) {
    let userid = req.params.id
    const user = await db.getUser();
    console.log(user)
    console.log(userid)
    res.render("updateUser", {
      title: "Update user",
      user: user,
      userid: userid,
    });
  };

async function indexUpdatePost(req, res){
    const { firstname, lastname, email, password} = req.body;
    let userid = req.params.id; 
    await db.updateUser(userid, firstname, lastname, email, password);
    res.redirect("/");
  }

  async function indexDeletePost(req, res) {
    const { firstname, lastname, email, password, status} = req.body;
    let userid = req.params.id; 
    await db.deleteUser(userid, firstname, lastname, email, password, status);
    res.redirect("/");
  }

  //gets the sign up page
async function indexUpgradeMember(req, res) {
  res.render("login", {
      title: "login",
  });
}

  //gets the sign up page
  async function indexGetMessage(req, res) {
    res.render("message", {
        title: "Message",
    });
  }

  async function indexPostMessage(req, res, next){

    try {
      validateUser,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).render("message", {
            title: "Message",
            errors: errors.array(),
          });
        }
      }
    } catch(err) {
      return next(err)
     }
  
    try {

      await pool.query("insert into messages ( firstname, lastname, email, created_at, message) values ($1, $2, $3, $4, $5)", [req.body.firstname, req.body.lastname, req.body.email, req.body.created_at, req.body.message]); //remove if breaks app
      await pool.query("UPDATE messages SET created_at = current_timestamp;")
      res.redirect("/");
         } catch(err) {
      return next(err)
    }

  }


  async function indexGetMsgDelete(req, res, next) {

    let userid = req.params.id;
    const user = await db.getUser();
    const allMessages = await db.getAllMessages();
    const users = await db.getAllUsers();
    const admins = await db.getAllAdmins();
    const getMessages = await db.getMessages(); // the query to grab messages from db

    //console.log(userid)

    try {
      //console.log("is this happening")
      //console.log(userid);

      await pool.query("UPDATE signups SET status = $1 WHERE id = $2 RETURNING*", ['admin', userid]);
      res.render("admin", {
        title: "admin",
        admins: admins,
        getMessages: getMessages,
      });
    } catch(err) {
      return next(err)
    }
  }

 
  async function indexDeleteMsg(req, res) {
    const { firstname, lastname, email, message, created_at} = req.body;
    let userid = req.params.id; 
    console.log(userid)
    await db.deleteMsg( userid, firstname, lastname, email, message, created_at);
    res.redirect("/");
  }




module.exports = {
    indexUserGet,
    indexSignUpGet,
    indexSignUpPost,
    indexUpdateGet,
    indexUpdatePost,
    indexDeletePost,
    indexUpgradeMember,
    indexGetMessage,
    indexPostMessage,
    indexGetMsgDelete,
    indexDeleteMsg
  };
