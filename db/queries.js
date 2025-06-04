const pool = require("./pool");
const bcrypt = require('bcryptjs');

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM signups");
  return rows;
}

async function getAllAdmins(){
  const { rows } = await pool.query("SELECT * FROM signups WHERE status = 'admin'")
  return rows;
}

async function insertUser(firstname, lastname, email, password, status) {
  await pool.query("INSERT INTO signups (firstname, lastname, email, password, status) VALUES ($1, $2, $3, $4, $5)",
     [firstname, lastname, email, password, status]);
} 

async function getUser() {
    const { rows } = await pool.query("SELECT * FROM signups WHERE id = id");
    return rows;
}

async function updateUser(userid, firstname, lastname, email, password, status) {
    await pool.query("UPDATE signups SET (firstname, lastname, email, password, status) = ($1, $2, $3, $4, $5) WHERE id = " + userid, [firstname, lastname, email, password, status]);
}


async function deleteUser(userid, firstname, lastname, email, password, status) {
  await pool.query("DELETE FROM signups WHERE id = " + userid);
}

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}


async function getMessages() {
  const { rows } = await pool.query("SELECT msg.id, msg.firstname, msg.message FROM messages msg INNER JOIN signups ON msg.email = signups.email;");
  return rows;
}

async function deleteMsg(userid, firstname, lastname, email, message, created_at) {
  await pool.query("DELETE FROM messages WHERE id = " + userid);
}



module.exports = {
  getAllUsers,
  insertUser,
  getUser,
  updateUser,
  deleteUser,
  getAllMessages,
  getMessages,
  deleteMsg,
  getAllAdmins
};