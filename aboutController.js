const links = require("../app");

exports.getAbout = (req, res) => {
    res.render("about", { 
        message: "about test", 
        links: links.links,
    });
};


exports.getAuthorID = (req, res) => {
    const { authorId } = req.params;
    console.log(authorId)
    res.render("about", {
        authorId: "authorId",
        links: links.links,
        message: "Get Author ID",
      });
}
