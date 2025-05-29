// routes/authorRouter.js
const { Router } = require("express");
const aboutController = require("../controllers/aboutController")
const aboutRouter = Router();

aboutRouter.get("/", aboutController.getAbout);
aboutRouter.get("/:authorId", aboutController.getAuthorID);



module.exports = aboutRouter;
