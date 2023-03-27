let express = require("express");
let mongoose = require("mongoose");
let bodyparser = require("body-parser");
let jwt = require("jsonwebtoken");
let app = express();
app.use(express.static("assets"));
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST,GET,PUT,PATCH,DELETE");
        return res.status(200).json({});
    }
    if (req.path === "/gettoken") {
        next();
    }
    else {
        if (req.headers.authorization) {
            try {
                let token = req.headers.authorization.split(" ")[1];
                let decode = jwt.verify(token, 'swastik');
                next();
            }
            catch (ex) {
                res.end(JSON.stringify({ status: "failed", data: ex }));
            }
        }
        else {
            res.end(JSON.stringify({ status: "failed", data: "No Authorization" }));
        }
    }
});

mongoose.connect("mongodb://127.0.0.1:27017/swastik");
let db = mongoose.connection;
db.on("error", error => console.log(error));
db.on("open", () => console.log("Connection Established"));

app.post("/gettoken", (req, res) => {
    var token = jwt.sign({ name: 'admin' }, 'swastik', { expiresIn: "10d" });
    res.end(JSON.stringify({ status: "success", token: token }));
});

app.get("/", (req, res) => {
    res.send("Welcome to Swastik Krishiseva Kendra");
    res.end();
});

app.use("/login", require("./routes/login"));
app.use("/admins", require("./routes/admins"));
app.use("/farmers", require("./routes/farmers"));
app.use("/crops", require("./routes/crops"))


app.listen(8081, () => {
    console.log("Server running on http://localhost:8081");
})