
const eqObjects = function(object1, object2) {
  let i = 0;
  let y = 0;

  if ((Object.keys(object1).length !== Object.keys(object2).length)) {
    return false;
  }
  for (const key in object1) {
    if(eqArrays(object1[key], object2[key]) === true) {
      i += 1;
      
    }
    y+=1; 
  }
  if (y === i) {
    return true
  } else {
    return false
  }
};

const eqArrays = function (arry1, arry2) {
  if (arry1.length !== arry2.length) {
    return false;
  }
  for (let i = 0; i < arry1.length; i++) {
    if (arry1[i] !== arry2[i]) {
      return false;
    }
  }
  return true;
}

const findUserByEmail = (email, database) => {
  for (const userId in database) {
    const user = database[userId];
    // if the email we pass matches a user's email
    if (user.email === email) {
      return user;
    }
  }
}
const searchAllShortUrl = (shortURL, urlDatabase) => {
  for (const cookie in urlDatabase) {
    for (const key in urlDatabase[cookie]) {
      if (key === shortURL) {
        return urlDatabase[cookie][key];
      }
    }
  }
}
const searchForUserId = (email, database) => {
  for (const userId in database) {
    for (const key in database[userId]) {
      if (database[userId].email === email) {
        return userId
      }
    }
  }
}

const searchForLongURL = (shortURL, database) => {
  for (const userId in database) {
    for (const smallURLs in database[userId]) {
      if (smallURLs === shortURL) {
        return database[userId][smallURLs]
      }
    }
  }
}

const generateRandomString = (urlDatabase) => { //Generates random string
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = '';
  for (let i = 6; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  if (urlDatabase[result]) {
    return generateRandomString()
  } else {
    return result;
  }
  
}



module.exports = { findUserByEmail, searchAllShortUrl, searchForUserId, searchForLongURL, generateRandomString }