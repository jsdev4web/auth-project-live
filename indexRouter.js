const { Router } = require("express");
const indexController = require("../controllers/indexController")
const indexRouter = Router();
const passport = require("passport")


indexRouter.get("/", indexController.indexUserGet);
indexRouter.get("/sign-up", indexController.indexSignUpGet);
indexRouter.post("/sign-up", indexController.indexSignUpPost);
indexRouter.get("/:id/update", indexController.indexUpdateGet);
indexRouter.post("/:id/update", indexController.indexUpdatePost);
indexRouter.post("/:id/delete", indexController.indexDeletePost);
indexRouter.get("/login", indexController.indexUpgradeMember);
indexRouter.post("/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/"
}));
indexRouter.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/")
    });
});
indexRouter.get("/message", indexController.indexGetMessage);
indexRouter.post("/message", indexController.indexPostMessage)

//Can I change ... was "/:id/admin" route here

indexRouter.get("/:id/admin", indexController.indexGetMsgDelete);
indexRouter.post("/:id/adminDelete", indexController.indexDeleteMsg);






module.exports = indexRouter;
