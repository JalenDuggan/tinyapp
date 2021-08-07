

const createNewUser = (userDatabase, userObject) => {
  if (!userDatabase[userObject.email]) {
    userDatabase[email] = userObject
    return userObject
  }
  return null
}

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


module.exports = { createNewUser, eqObjects }