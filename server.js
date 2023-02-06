const { generateOTP } = require("./otp");
const express = require("express");
const sql = require("./app/models/db");
const { sendMail } = require("./mail");

const app = express();

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to truecaller clone application." });
});

app.get("/:id", (req, resp) => {
  sql.query(
    "SELECT * FROM users WHERE phone =" + req.params.id,
    (err, result) => {
      if (err) resp.send(err);
      resp.send({ ...result[0] });
    }
  );
});

app.post("/pushContacts", (req, resp) => {
  const data = req.body;
  sql.query("INSERT INTO master SET ?", data, (err, result) => {
    if (err) resp.send(err);
    resp.send(result);
  });
});

app.post("/", (req, resp) => {
  const data = req.body;
  sql.query("INSERT INTO users SET ?", data, (err, result, fields) => {
    if (err) resp.send({ status: "error" });
    else {
      if (result.affectedRows > 0) {
        resp.send({ status: "success" });
      } else {
        resp.send({ status: "failed" });
      }
    }
  });
});

app.post("/otp", async (req, resp) => {
  const otp = generateOTP();
  const data = req.body;
  const mail = await sendMail({ to: data.email, OTP: otp });
  if (mail) {
    resp.send({ otp: otp });
  } else {
    resp.send({ otp: "failed" });
  }
});

app.put("/:id", (req, resp) => {
  const data = [req.body, req.params.id];
  sql.query(
    "UPDATE users SET ? where phone = ?",
    data,
    (err, result, fields) => {
      if (err) resp.send({ status: "error" });
      else {
        resp.send({ status: "success" });
      }
    }
  );
});

app.delete("/:id", (req, resp) => {
  sql.query(
    "DELETE FROM users WHERE phone = " + req.params.id,
    (err, result) => {
      if (err) resp.send({ status: "error" });
      else {
        resp.send({ status: "success" });
      }
    }
  );
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
