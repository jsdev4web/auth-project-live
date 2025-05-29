const links = require("../app");
const pool = require("../db/pool");


async function getContact(req, res, email) {

    const { rows } = await pool.query("SELECT * FROM signups");
    console.log(rows)



    res.render("contact", { 
        message: "contact pages", 
        links: links.links,
        contactInfo: "Contact Stuff",
        rows: rows
    });
};


module.exports = {
    getContact
}

//pool.query( 'UPDATE users SET status = $1 WHERE email = $2 RETURNING *', 
//  ['admin', email]); - as