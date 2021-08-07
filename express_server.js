const express = require('express');
const app = express();
const PORT = 8080; //default port 8080
const { eqObjects, createNewUser, findUser } = require("./helpers/authenticationHelpers")
const { generateRandomString } = require("./helpers/keyGen")

app.set("view engine", "ejs"); //tells the Express app to use EJS as its templating engine

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const cookieParser = require('cookie-parser')
app.use(cookieParser())


//------------------------------------------------------------------------------------------
//-----------------------------------"DATABASE"---------------------------------------------
//------------------------------------------------------------------------------------------
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {
  he53h6: {
    email: "gentleman@cambrioleur.com",
    password: "paris",
  },
}
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------


function getKeyByValue(object, value) {
  for (const key in object) {
    if (eqObjects(object[key],value)) {
      return key
    }
  }
}
const findUserByEmail = (email) => {
  for (const userId in users) {
    const user = users[userId];
    // if the email we pass matches a user's email
    if (user.email === email) {
      return user;
    }
  }
}  
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------

app.get("/urls.json", (req, res) => {
  res.send(urlDatabase);
});

app.get("/urls", (req, res) => {
  const cookieId = req.cookies.user_id;
  const templateVars = { urls: urlDatabase, usernames: users, cookieId: cookieId };
  res.render("urls_index", templateVars);
});


app.get("/urls/new", (req, res) => {
  const cookieId = req.cookies.user_id;
  const templateVars = { urls: urlDatabase, usernames: users, cookieId: cookieId };
  res.render("urls_new", templateVars)
});

app.get("/urls/:shortURL", (req, res) => {
  const cookieId = req.cookies.user_id;
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], usernames: users, cookieId: cookieId };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => { //takes new url from user and make unique id for it to be saved in array
  const urlId = generateRandomString();
  const urlContent = req.body.longURL;
  urlDatabase[urlId] = urlContent;
  res.redirect(301, `/urls/${urlId}`)
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL)
});

app.post("/urls/:shortURL/delete", (req, res) => { //deletes the given key from the urlDatabass using form
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect("/urls")
});

app.post("/urls/:shortURL", (req, res) => { //Redirect the user when the edit button is click to the /urls/:shortURL
  const editURL = req.params.shortURL;
  
  res.redirect(`/urls/${editURL}`)
});

app.post("/urls/:shortURL/edit", (req, res) => { //takes new longURL from user and replaces it in the object
  const cookieId = req.cookies.user_id;
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], usernames: users, cookieId: cookieId };
  res.render("urls_show", templateVars);
  const urlId = req.params.shortURL;
  const urlContent = req.body.longURL;
  urlDatabase[urlId] = urlContent;
  
  res.redirect(`/urls`)
});

app.post("/login/point", (req, res) => { //direct user to login page
  res.redirect(`/login`)
});

app.post("/login", (req, res) => { //Logins user
  const email = req.body.email;
  const password = req.body.password;

  const confi = {
    email: email,
    password: password
  }

  if(!email || !password){
    return res.status(400).send('email and password cannot be blank');
  }
  
  const userId = getKeyByValue(users, confi)
  console.log(userId);

  // we didn't find user
  if (!userId) {
    return res.status(400).send('no user with that email found')
  }

  // found the user, now does their password match?
  if (users[userId].password !== password) {
    return res.status(400).send('password does not match')
  }

  // happy path
  res.cookie('user_id', userId);
  return res.redirect("/urls")
});

app.post("/logout", (req, res) => { //Logouts the user
  res.clearCookie('user_id')
  res.redirect("/urls")
});

app.get("/registar", (req, res) => {
  const cookieId = req.cookies.user_id;
  const templateVars = { urls: urlDatabase, usernames: users, cookieId: cookieId };
  res.render("registar", templateVars)
});


// - /register (POST) - Create user with form information
app.post("/register", (req, res) => {
  const userId = generateRandomString()
  const userObject = {
    email: req.body.email,
    password: req.body.password
  }
  
  if (!userObject.email || !userObject.password) {
    return res.status(400).send('Email and password cannot be blank');
  }
  
  const user = findUserByEmail(userObject.email);
  
  if (user) {
    return res.status(400).send('The email address is alread in use')
  }
  
  users[userId] = {
    email: req.body.email,
    password: req.body.password
  }

  res.cookie('user_id', userId)
  return res.redirect("/urls")
}); 

app.get("/login", (req, res) => {
  const cookieId = req.cookies.user_id;
  const templateVars = { urls: urlDatabase, usernames: users, cookieId: cookieId };
  res.render("urls_login", templateVars)
});

app.post("/registar/point", (req, res) => {
  res.redirect("/registar")
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

module.exports = { urlDatabase };
