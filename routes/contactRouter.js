const { Router } = require("express");
const contactController = require("../controllers/contactController")
const contactRouter = Router();

contactRouter.get("/", contactController.getContact);


module.exports = contactRouter;
