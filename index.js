// index.js

/**
 * Required External Modules
 */

const express = require("express");
var bodyParser = require('body-parser')
const path = require("path");
const { Octokit } = require("@octokit/rest");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";


/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
  });

app.get("/user", (req, res) => {
  res.render("user", { title: "Profile", userProfile: { nickname: "James", title: "Solutions Engineer", company: "GitHub" } });
});

app.get('*', function(req, res){
    res.render(path.join(__dirname + '/views/404.pug'));
});

app.post('/user', async (req, res) => {
    const username = req.body.username
    //...
    var userData = await getUser(username)
    res.render("user", { title: "Profile", userProfile: { handle: username, GitHub_Profile: userData} });
  })

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });


/**
 * Business Logic
 */

const octokit = new Octokit();

async function getUser(userHandle)
{
    try
    {
       const { data: user } = await octokit.users.getByUsername({
            username: userHandle
        })
        return user;
        // .then(({ user }) => {
        //     return user
        // });
    }
    catch(error)
    {
        console.log(error)
    }
}

