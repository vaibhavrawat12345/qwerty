let express = require("express");

var cors = require("cors");
let app = express();
app.use(cors());

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested=With,X-Auth-Token, Content-Type, Accept"
  );
  next();
});

const { Client } = require("pg");
const client = new Client({
    host: "db.cmgyhahooillykpcdrcz.supabase.co",
    user: "postgres",
    password: "vaibhavrawat@12",
    database: "postgres",
    port: 5432,
    ssl: { rejectUnauthorized: false },
});

var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));


client.connect(function (err, result) {
   console.log(`Connected!!!`,client.port)
})


app.get("/users", function (req, res, next) {
    const query = "SELECT * FROM users";
    client.query(query, function (err, result) {
        if (err) { 
          res.status(400).send(err);    console.log(err)


        }
        console.log(result.rows)
        res.send(result.rows); 
   
        client.end();
    });

});




app.post("/users", function (req, res, next) {
    console.log("Inside post of user");
    var values = Object.values(req.body);console.log(values);
    const query = `INSERT INTO users (email, firstname,lastname,age) VALUES ($1,$2,$3,$4)`;
    client.query(query, values, function (err, result) {if (err) {res.status(400).send(err);}
    //console.log(result);
    res.send(`${result.rowCount} insertion successful`);
    });
});


app.put("/users/:id", function (req, res, next) {
    console.log("Inside put of user");
    let userId = req.params.id;
    let age = req.body.age;
    let values = [age, userId]
    const query = `UPDATE users SET age= $1 WHERE id= $2`;
    client.query(query, values, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        res.send(" updation successful");
    });
});