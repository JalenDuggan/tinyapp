const express = require('express');
const app = express();
const PORT = 8080; //default port 8080

app.set("view engine", "ejs"); //tells the Express app to use EJS as its templating engine

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const generateRandomString = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = '';
  for (var i = 6; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  if (urlDatabase[result]) {
    return generateRandomString()
  } else {
    return result;
  }
  
}

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.send(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new")
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body)
  res.send("Ok");
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});